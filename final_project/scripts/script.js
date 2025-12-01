document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Logic
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Dynamic JSON Loading for Homepage
    const gridContainer = document.getElementById('dynamic-grid');

    if (gridContainer) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    
                    card.innerHTML = `
                        <h3>${item.title}</h3>
                        <p>${item.text}</p>
                        <a href="${item.link}" class="card-link">${item.buttonText} &rarr;</a>
                    `;
                    
                    gridContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error loading data:', error));
    }
});