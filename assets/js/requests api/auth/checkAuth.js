import './logout.js';
import { openSessionTeacher } from './loginRequest.js';

var token = localStorage.getItem('teacherToken');
var teacherId = localStorage.getItem('teacherId');
var expiration = localStorage.getItem('teacherTokenExpiration');

if (token || expiration) {
    openSessionTeacher(teacherId, () => ({}));
}

function dateNow() {
    // Get the current date
    const currentDate = new Date();

    // Get the components of the date
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    const hours = String(currentDate.getUTCHours()).padStart(2, '0');
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');

    // Construct the ISO 8601 formatted date string
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

function isAuthenticated() {
    const token = localStorage.getItem('teacherToken');
    const expiration = localStorage.getItem('teacherTokenExpiration');

    if (!token || !expiration) {
        return false;
    }

    const now = dateNow();
    if (now > expiration) {
        logout();
        return false;
    }

    // const teacherSession = sessionStorage.getItem('teacher');
    // if (!teacherSession){
    //     logout();
    //     return false;
    // }

    return true;
}

const isLoggedIn = isAuthenticated();
const currentPath = window.location.pathname;


if (!isLoggedIn && currentPath !== '/view/auth/login.html') {
    window.location.href = '/view/auth/login.html';
} else if (isLoggedIn && currentPath === '/view/auth/login.html') {
    window.location.href = '/view/mian/index.html';  // Redirect to the home page or any other page
}