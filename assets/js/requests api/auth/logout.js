function logout() {
    // Clear local storage
    localStorage.removeItem('teacherId');
    localStorage.removeItem('teacherToken');
    localStorage.removeItem('teacherTokenExpiration');
    sessionStorage.removeItem('teacher');

    // redirect to login
    window.location.href = 'auth/login.html';
}