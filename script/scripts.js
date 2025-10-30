import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const courseList = [
    { code: 'WDD 231', name: 'Web Frontend Development II', credits: 3, subject: 'WDD', completed: true },
    { code: 'CSE 111', name: 'Programming with Functions', credits: 2, subject: 'CSE', completed: false },
    { code: 'WDD 131', name: 'Web Frontend Development I', credits: 3, subject: 'WDD', completed: true },
    { code: 'COMM 220', name: 'Public Speaking', credits: 3, subject: 'COMM', completed: false },
    { code: 'CSE 210', name: 'Programming with Classes', credits: 2, subject: 'CSE', completed: false },
    { code: 'MATH 108', name: 'Finite Mathematics', credits: 3, subject: 'MATH', completed: true },
    { code: 'CIS 300', name: 'Data Management', credits: 3, subject: 'CIS', completed: false },
];

let coursesToDisplay = courseList;

function renderCourseList(courses) {
    const listElement = document.getElementById('course-list');
    const totalCreditsElement = document.getElementById('total-credits');
    
    if (!listElement || !totalCreditsElement) {
        console.error("Required elements not found.");
        return;
    }

    listElement.innerHTML = ''; 

    courses.forEach(course => {
        const li = document.createElement('li');
        li.classList.add('p-3', 'bg-white', 'border', 'border-gray-200', 'rounded-md', 'shadow-sm', 'flex', 'flex-col', 'sm:flex-row', 'justify-between', 'items-start', 'sm:items-center', 'mb-2');
        
        const completedMark = course.completed ? '<span title="Completed" class="text-green-600 mr-2">*</span>' : '<span class="mr-2"></span>';
        const completedClass = course.completed ? 'opacity-70 line-through' : 'font-medium';
        
        li.innerHTML = `
            <div class="flex items-center">
                ${completedMark}
                <span class="text-sm ${completedClass}">${course.code} - ${course.name}</span>
            </div>
            <span class="text-xs font-semibold text-gray-500 mt-1 sm:mt-0">${course.credits} Credits</span>
        `;
        listElement.appendChild(li);
    });

    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
}

function filterCourses(subject) {
    if (subject === 'all') {
        coursesToDisplay = courseList;
    } else {
        coursesToDisplay = courseList.filter(course => course.subject === subject);
    }
    renderCourseList(coursesToDisplay);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.subject === subject) {
            btn.classList.remove('bg-gray-200', 'text-gray-700');
            btn.classList.add('bg-blue-600', 'text-white');
        } else {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        }
    });
}

function setupFilterListeners() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const subject = e.target.dataset.subject;
            filterCourses(subject);
        });
    });
}


const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let app;
let db;
let auth;
let userId = null;

async function setupAuth() {
    try {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);

        if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
        } else {
            await signInAnonymously(auth);
        }

        userId = auth.currentUser?.uid || crypto.randomUUID();
        console.log("Firebase initialized. User ID:", userId);

    } catch (error) {
        console.error("Firebase setup error:", error);
        userId = crypto.randomUUID();
    }
}


function setupUIListeners() {
    const generationDateElement = document.getElementById('generation-date');
    if (generationDateElement) {
        const now = new Date();
        const pad = (num) => num.toString().padStart(2, '0');

        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const year = now.getFullYear();
        const datePart = `${month}/${day}/${year}`;

        const hour = pad(now.getHours());
        const minute = pad(now.getMinutes());
        const second = pad(now.getSeconds());
        const timePart = `${hour}:${minute}:${second}`;

        generationDateElement.textContent = `${datePart} ${timePart}`;
    }

    if (document.getElementById('current-year')) document.getElementById('current-year').textContent = new Date().getFullYear();
    
    renderCourseList(courseList); 
    setupFilterListeners(); 
}

window.onload = async function() {
    await setupAuth(); 
    setupUIListeners();
};
