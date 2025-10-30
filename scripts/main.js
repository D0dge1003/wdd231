// 1. Dynamic Dates and Last Modified Date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// 2. Responsive Menu Logic
const nav = document.querySelector('nav');
const menuButton = document.getElementById('menu');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
    // Change the icon from '☰' to 'X' for a better user experience
    menuButton.textContent = nav.classList.contains('open') ? '✕' : '☰';
    menuButton.setAttribute('aria-expanded', nav.classList.contains('open'));
});


// 3. Course List Generation, Filtering, and Reduction
const coursesContainer = document.getElementById('course-cards-container');
const totalCreditsValue = document.getElementById('total-credits-value');
const filterButtons = document.querySelectorAll('.filter-controls button');

// Function to display a list of courses (DOM Manipulation)
function displayCourses(courseList) {
    coursesContainer.innerHTML = ''; // Clear existing content

    courseList.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        if (course.completed) {
            card.classList.add('completed');
        }

        const h3 = document.createElement('h3');
        h3.textContent = `${course.courseCode}: ${course.name}`;

        const creditsP = document.createElement('p');
        creditsP.textContent = `Credits: ${course.credits}`;

        const statusP = document.createElement('p');
        statusP.textContent = course.completed ? 'Status: Completed' : 'Status: In Progress';
        
        card.appendChild(h3);
        card.appendChild(creditsP);
        card.appendChild(statusP);
        coursesContainer.appendChild(card);
    });
}

// Function to calculate and display total credits (Array Reduce)
function displayTotalCredits(courseList) {
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsValue.textContent = totalCredits;
}

// Function to handle filtering (Array Filter)
function filterCourses(courseType) {
    let filteredList = [];

    if (courseType === 'All') {
        filteredList = courses;
    } else {
        // Use filter() to get only courses that match the type (e.g., 'WDD' or 'CSE')
        filteredList = courses.filter(course => course.courseCode.startsWith(courseType));
    }

    displayCourses(filteredList);
    displayTotalCredits(filteredList);
}

// Initial load: Display all courses
filterCourses('All');


// Event Listeners for Filter Buttons
filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Update active class for styling
        filterButtons.forEach(btn => btn.classList.remove('active-filter'));
        event.target.classList.add('active-filter');

        // Determine filter type based on button ID
        let filterType = '';
        switch(event.target.id) {
            case 'filter-wdd':
                filterType = 'WDD';
                break;
            case 'filter-cse':
                filterType = 'CSE';
                break;
            default:
                filterType = 'All';
                break;
        }
        
        filterCourses(filterType);
    });
});