// Function 1: Setup Navigation (for hamburger menu)
export function setupNavigation() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // DOM Manipulation: Toggles the aria-expanded attribute
            burger.setAttribute(
                "aria-expanded",
                navLinks.classList.contains("active")
            );
        });
    }
}

// Function 2: Data Loading (Fetch API, Async/Await, Try/Catch, Array Method, Template Literals)
export async function loadData() {
    const gridContainer = document.getElementById('dynamic-grid');
    if (!gridContainer) return;

    try {
        // Data Fetching: Retrieve data from local JSON file
        const response = await fetch('data.json'); 
        
        // Error handling for bad HTTP status
        if (!response.ok) {
            throw new Error(`Data load failed with status: ${response.status}`);
        }

        const data = await response.json();

        // Array Methods: Use forEach to iterate over the data (15+ items)
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            // Template Literals & Dynamic Content Generation (4+ properties: title, text, link, buttonText)
            card.innerHTML = `
                <h3 id="${item.id}">${item.title}</h3>
                <p>${item.text}</p>
                <a href="${item.link}" class="card-link">
                    ${item.buttonText} → 
                </a>
            `;

            // DOM Manipulation: Append the new card
            gridContainer.appendChild(card);
        });

    } catch (error) {
        // Asynchronous functionality with a try...catch block
        console.error("Critical Error: Failed to load and render dynamic data.", error);
        gridContainer.innerHTML = `<p style="color: red; padding: 2rem;">Error loading content. Please check the 'data.json' file. Details: ${error.message}</p>`;
    }
}


// Function 3: Local Storage & Modal Dialog
export function initializeFeatures() {
    const modal = document.getElementById('welcome-modal');
    const closeModal = document.querySelector('.close-button');
    const daysElement = document.getElementById('last-visit-days');
    
    // Local Storage: Check and update last visit
    const lastVisit = localStorage.getItem('lastVisitTimestamp');
    const now = Date.now();
    const msInDay = 1000 * 60 * 60 * 24;

    if (lastVisit && modal && daysElement) {
        const days = (now - parseInt(lastVisit)) / msInDay;
        
        // If it's been more than 1 day since last visit, show the modal
        if (days > 1) {
            daysElement.textContent = days.toFixed(1);
            modal.showModal(); // Show the modal dialog
        }
    }
    
    // Local Storage: Always update the current visit time
    localStorage.setItem('lastVisitTimestamp', now);

    // Modal Dialog: Close button functionality (DOM Manipulation)
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.close();
        });
    }
}


// Main script execution wrapper
document.addEventListener('DOMContentLoaded', () => {
    // Setup functions
    setupNavigation();
    
    // Only load dynamic data on the index page
    if (document.getElementById('dynamic-grid')) {
        loadData();
    }
    
    // Initialize Local Storage and Modal on all pages
    initializeFeatures();
});