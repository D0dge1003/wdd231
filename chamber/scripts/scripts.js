
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
        const response = await fetch('members.json'); 
        const members = await response.json(); 
        
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