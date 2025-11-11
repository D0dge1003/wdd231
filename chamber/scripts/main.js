document.addEventListener('DOMContentLoaded', () => {
    // Footer Utilities
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastmodified').textContent = document.lastModified;

    // Mobile Navigation Toggle (Rubric 6)
    const toggleButton = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    toggleButton.addEventListener('click', () => {
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
        toggleButton.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('open');
    });

    // Run main functions defined in external scripts
    // These functions must exist in weather.js and spotlights.js
    getWeather();
    loadSpotlights();
});