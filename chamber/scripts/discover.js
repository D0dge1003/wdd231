const memberCards = document.getElementById('member-cards');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const visitMessage = document.getElementById('last-visit-message');

const DAYS_IN_MS = 86400000;
let membersData = []; // Store the fetched data globally

function getMessage(days) {
    if (days < 1) {
        return "Back so soon! Awesome!";
    } else if (days === 1) {
        return "You last visited 1 day ago.";
    } else {
        return `You last visited ${days} days ago.`;
    }
}

function checkLastVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    const today = Date.now();

    if (lastVisit) {
        const daysDifference = Math.floor((today - parseInt(lastVisit)) / DAYS_IN_MS);
        visitMessage.textContent = getMessage(daysDifference);
    } else {
        visitMessage.textContent = "Welcome! This is your first visit.";
    }

    localStorage.setItem('lastVisit', today.toString());
}

function cloneAndAddCard(originalCard) {
    // Find the original member data based on the card's content (e.g., title)
    const title = originalCard.querySelector('h3').textContent;
    const originalMember = membersData.find(m => m.name === title);
    
    if (originalMember) {
        // Clone the member data and make it unique for the new card
        const newMember = { ...originalMember, name: originalMember.name + ' (Cloned)' };

        // Determine the next index for CSS Grid purposes
        const currentIndex = memberCards.children.length;

        // Create the new card and append it
        const newCard = createMemberCard(newMember, currentIndex);
        memberCards.appendChild(newCard);

        // Re-run lazy loading for the new card's image
        lazyLoadImages(newCard);
    }
}

function createMemberCard(member, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Add class for three-column named grid area distinction
    if (index === 0 || index === 3 || index === 6) {
        card.classList.add('three-column');
    }

    const title = document.createElement('h3');
    title.textContent = member.name;

    const address = document.createElement('p');
    address.textContent = member.address;
    
    const description = document.createElement('p');
    description.textContent = member.description;

    const image = document.createElement('img');
    image.setAttribute('data-src', member.image); 
    image.setAttribute('alt', member.name);
    image.setAttribute('loading', 'lazy'); 

    const button = document.createElement('button');
    button.textContent = "Learn More";
    
    // ⭐ MODIFICATION HERE: Add the cloneAndAddCard functionality
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Stop the default link behavior
        cloneAndAddCard(card);
    });

    card.appendChild(title);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(image);
    card.appendChild(button);

    return card;
}

// ⭐ MODIFICATION HERE: Accept an optional root element to observe (for new cards)
function lazyLoadImages(root = memberCards) {
    const images = root.querySelectorAll('img[data-src]');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 100px 0px' 
    });

    images.forEach(img => {
        observer.observe(img);
    });
}

async function loadMembers() {
    try {
        const response = await fetch('data/members_2.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        membersData = await response.json(); // Store the data
        
        memberCards.innerHTML = ''; 
        membersData.slice(0, 8).forEach((member, index) => { 
            memberCards.appendChild(createMemberCard(member, index));
        });
        
        lazyLoadImages(); // Initiate lazy loading after cards are added
    } catch (error) {
        console.error('Error loading member data:', error);
    }
}

function setView(viewType) {
    memberCards.className = '';
    memberCards.classList.add(viewType);
    
    gridViewBtn.classList.remove('active-view');
    listViewBtn.classList.remove('active-view');

    if (viewType === 'grid') {
        gridViewBtn.classList.add('active-view');
    } else {
        listViewBtn.classList.add('active-view');
    }
}

// Event Listeners for view control
gridViewBtn.addEventListener('click', () => setView('grid'));
listViewBtn.addEventListener('click', () => setView('list'));

// Initial Load and Setup
document.addEventListener('DOMContentLoaded', () => {
    checkLastVisit();
    loadMembers();
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});