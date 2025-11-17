document.addEventListener('DOMContentLoaded', () => {
    // 1. Set the form load time timestamp
    const formLoadTimeInput = document.getElementById('form-load-time');
    if (formLoadTimeInput) {
        // Set the value to the current time when the form loads
        formLoadTimeInput.value = new Date().toISOString();
    }

    // 2. Handle the modals (Show/Hide)
    const modalButtons = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open Modal Functionality
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close Modal Functionality
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the closest parent dialog element and close it
            const modal = button.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });

    // 3. Set the footer's last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        // Use document.lastModified for the last modified date
        const lastModDate = new Date(document.lastModified);
        // Format the date as M/D/YYYY for consistency with your images
        const formattedDate = (lastModDate.getMonth() + 1) + '/' + lastModDate.getDate() + '/' + lastModDate.getFullYear();
        lastModifiedElement.textContent = formattedDate;
    }
});