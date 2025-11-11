// --- CRITICAL: REPLACE THESE PLACEHOLDERS WITH YOUR REAL DATA ---
const API_KEY = "a1b2c3d4e5f6g7h8i9j0k1l2";
const CHAMBER_LAT = "33.1581"; // Example Latitude
const CHAMBER_LON = "-117.3506"; // Example Longitude

const CURRENT_TEMP_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${CHAMBER_LAT}&lon=${CHAMBER_LON}&units=imperial&appid=${API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${CHAMBER_LAT}&lon=${CHAMBER_LON}&units=imperial&appid=${API_KEY}`;

async function getWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(CURRENT_TEMP_URL),
            fetch(FORECAST_URL)
        ]);
        
        // --- CRITICAL CHECK ---
        if (!currentResponse.ok) {
            console.error(`Weather API Error: Status ${currentResponse.status}. Check API Key and URL.`);
            // Display static error message on the page
            document.getElementById('current-temp').textContent = 'N/A';
            document.getElementById('weather-desc').textContent = 'API Error';
            return; // Stop execution
        }
        // ----------------------
        
        const dataCurrent = await currentResponse.json();
        const dataForecast = await forecastResponse.json();
        
        displayCurrentWeather(dataCurrent);
        displayForecast(dataForecast);

    } catch (error) {
        console.error('Error during weather fetch or processing:', error);
    }
}

function displayCurrentWeather(data) {
    if (data.main) { // Check if data is valid
        const temp = Math.round(ta.main.temp);
        const desc = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const iconCode = data.weather[0].icon;
        const iconSrc = `https://openweathermap.org/img/w/${iconCode}.png`;

        document.getElementById('current-temp').textContent = temp;
        document.getElementById('weather-desc').textContent = desc;
        document.getElementById('weather-icon').src = iconSrc;
        document.getElementById('weather-icon').alt = desc + " icon";
    } else {
        console.warn("Weather API returned incomplete data (likely bad key or coordinates).");
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    if (!data.list) return;

    forecastContainer.innerHTML = ''; 
    const forecastDays = [];
    const uniqueDays = new Set();
    
    // Find the next 3 days at approximately noon
    for (const item of data.list) {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toISOString().split('T')[0];
        
        if (item.dt_txt.includes("12:00:00") && !uniqueDays.has(dayKey)) {
            uniqueDays.add(dayKey);
            forecastDays.push(item);
            if (forecastDays.length === 3) break;
        }
    }

    forecastDays.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(item.main.temp);

        const card = document.createElement('div');
        card.classList.add('forecast-day');
        card.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${temp}&deg;F</p>
        `;
        forecastContainer.appendChild(card);
    });
}