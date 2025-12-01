
export function setupNavigation() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            burger.setAttribute(
                "aria-expanded",
                navLinks.classList.contains("active")
            );
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation(); 
    
});