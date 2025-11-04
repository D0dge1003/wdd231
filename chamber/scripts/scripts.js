const memberData = [
  {"name": "Stellar Dynamics", "address": "101 Nebula Way, Stellar City", "phone": "555-123-4567", "website": "https://stellardynamics.com", "imagefile": "stellar.webp", "membership": 3, "description": "Leading aerospace technology and innovation since 2050."},
  {"name": "Astro Cafe", "address": "42 Comet Street, Stellar City", "phone": "555-987-6543", "website": "https://astrocafe.com", "imagefile": "astro.webp", "membership": 1, "description": "Local coffee and pastries, promoting interstellar tranquility."},
  {"name": "Orbit Logistics", "address": "202 Launch Pad, Stellar City", "phone": "555-333-2222", "website": "https://orbitlogistics.net", "imagefile": "orbit.webp", "membership": 2, "description": "Global supply chain specialists with a focus on fast transport."},
  {"name": "Cosmic Arts Studio", "address": "77 Galaxy Ave, Stellar City", "phone": "555-444-5555", "website": "https://cosmicarts.org", "imagefile": "cosmic.webp", "membership": 1, "description": "Gallery and art classes celebrating the cosmic wonders."},
  {"name": "Zenith Bank", "address": "500 Horizon Blvd, Stellar City", "phone": "555-666-7777", "website": "https://zenithbank.com", "imagefile": "zenith.webp", "membership": 3, "description": "Premier financial services and intergalactic investment firm."},
  {"name": "Nova Fitness", "address": "11 Star Lane, Stellar City", "phone": "555-111-0000", "website": "https://novafit.com", "imagefile": "nova.webp", "membership": 2, "description": "Modern gymnasium and training facility for peak performance."},
  {"name": "Luna Travel Agency", "address": "33 Crater Road, Stellar City", "phone": "555-222-9999", "website": "https://lunatravel.net", "imagefile": "luna.webp", "membership": 1, "description": "Customized space tours and planetary excursions."}
];
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');
const memberContainer = document.querySelector('#member-cards');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');
const toggleMenu = () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
};
menuButton.addEventListener('click', toggleMenu);
const setFooterDates = () => {
    document.querySelector('#currentyear').textContent = new Date().getFullYear();
    document.querySelector('#lastmodified').textContent = document.lastModified;
};
setFooterDates();
const getMembershipLevel = (level) => {
    switch(level) {
        case 3:
            return 'Gold Member';
        case 2:
            return 'Silver Member';
        case 1:
        default:
            return 'Associate Member';
    }
};
const createMemberCard = (member) => {
    const card = document.createElement('section');
    card.classList.add('member-card');
    const name = document.createElement('h3');
    name.textContent = member.name;
    name.classList.add('card-name');
    const image = document.createElement('img');
    image.setAttribute('src', `images/${member.imagefile}`);
    image.setAttribute('alt', `Logo of ${member.name}`);
    image.setAttribute('loading', 'lazy');
    const address = document.createElement('p');
    address.textContent = member.address;
    address.classList.add('card-address');
    const phone = document.createElement('p');
    phone.textContent = member.phone;
    phone.classList.add('card-phone');
    const website = document.createElement('a');
    website.setAttribute('href', member.website);
    website.setAttribute('target', '_blank');
    website.textContent = 'Website';
    website.classList.add('card-website');
    const level = document.createElement('p');
    level.textContent = getMembershipLevel(member.membership);
    level.classList.add('card-level');
    const description = document.createElement('p');
    description.textContent = member.description;
    description.classList.add('card-description');
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(level);
    card.appendChild(description);
    return card;
};
const displayMembers = (members) => {
    memberContainer.innerHTML = '';
    members.forEach(member => {
        memberContainer.appendChild(createMemberCard(member));
    });
};
const fetchMembers = async () => {
    try {
        const members = memberData;
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
};
fetchMembers();
const toggleView = (view) => {
    if (view === 'list') {
        memberContainer.classList.remove('member-grid');
        memberContainer.classList.add('member-list');
    } else {
        memberContainer.classList.remove('member-list');
        memberContainer.classList.add('member-grid');
    }
};
gridButton.addEventListener('click', () => toggleView('grid'));
listButton.addEventListener('click', () => toggleView('list'));