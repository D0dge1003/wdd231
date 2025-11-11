document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastmodified').textContent = document.lastModified;

    const toggleButton = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    toggleButton.addEventListener('click', () => {
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
        toggleButton.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('open');
    });

    
    getWeather();
    loadSpotlights();
});