const JSON_URL = "data/members.json"; 

async function loadSpotlights() {
    try {
        const response = await fetch(JSON_URL);
        if (!response.ok) throw new Error('Failed to load member data. Check file path.');

        const data = await response.json();
        const members = data.members; 

        const qualifiedMembers = members.filter(member => 
            member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
        );
        
        const MAX_SPOTLIGHTS = 3;
        const numSpotlights = Math.min(MAX_SPOTLIGHTS, qualifiedMembers.length);
        
        const selectedSpotlights = [];
        let memberPool = [...qualifiedMembers]; 
        
        for (let i = 0; i < numSpotlights; i++) {
            const randomIndex = Math.floor(Math.random() * memberPool.length);
            selectedSpotlights.push(memberPool.splice(randomIndex, 1)[0]);
        }

        displaySpotlights(selectedSpotlights);

    } catch (error) {
        console.error('Error loading member data for spotlights:', error);
        document.getElementById('spotlights-container').innerHTML = '<p class="card" style="grid-column: 1 / -1; text-align: center;">Could not load member data.</p>';
    }
}

function displaySpotlights(spotlights) {
    const container = document.getElementById('spotlights-container');
    container.innerHTML = ''; 

    spotlights.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card', 'card');
        
        card.innerHTML = `
            <img src="${member.logo}" alt="${member.name} Logo" loading="lazy">
            <h4>${member.name}</h4>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level">Membership: <strong>${member.membershipLevel}</strong></p>
        `;
        container.appendChild(card);
    });
}