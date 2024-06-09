
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
        logoutUser();
        return false;
    }

    return true;
}

const isLoggedIn = isAuthenticated();
const currentPath = window.location.pathname;

if (!isLoggedIn && currentPath !== '/auth/login.html') {
    window.location.href = 'auth/login.html';
} else if (isLoggedIn && currentPath === '/auth/login.html') {
    window.location.href = '/index.html';  // Redirect to the home page or any other page
}