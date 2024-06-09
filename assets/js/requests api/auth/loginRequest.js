const formLoginTeacher = document.querySelector('.loginTeacher');

formLoginTeacher.addEventListener('submit', event => {
    event.preventDefault();

    const TeacherFormData = new FormData(formLoginTeacher);
    const teacherData = Object.fromEntries(TeacherFormData);
    const teachertDataJson = JSON.stringify(teacherData);

    if (!navigator.onLine) {
        const error = new Error('لا يوجد اتصال بالإنترنت');
        error.name = 'OfflineError';
        throw error;
    }

    fetch('http://edu1.runasp.net/api/account/login', {
        method: 'POST',
        body: teachertDataJson,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                const error = new Error('البريد الإلكتروني أو كلمة السر خطأ');
                error.name = 'ResponseError';
                throw error;
            }
        })
        .then(data => {
            if (data.role === 'Teacher') {
                localStorage.setItem('successLogin', `اهلا`);
                localStorage.setItem('teacherId', data.id);
                localStorage.setItem('teacherToken', data.token);
                localStorage.setItem('teacherTokenExpiration', data.expiration);
                openSessionTeacher(data.id, () =>
                    window.location.href = "../../index.html"
                );
            } else {
                const error = new Error('البريد الإلكتروني أو كلمة السر خطأ');
                error.name = 'ResponseError';
                throw error;
            }
        })
        .catch(error => {
            if (error.name === 'ResponseError') {
                document.querySelector('.error').innerHTML = error.message;
            } else if (error.name === 'OfflineError') {
                iziToast.error({
                    title: 'الشبكة غير مستقره ',
                    position: 'topRight'
                });
            } else {
                console.error('Error:', error);
            }
        });
});

function openSessionTeacher(teacherId, callback) {
    // Request Get teacher
    let requestGetTeacher = new XMLHttpRequest();
    requestGetTeacher.open("GET", `http://edu1.runasp.net/api/teacher/${teacherId}`);
    requestGetTeacher.responseType = "json";
    requestGetTeacher.send();
    requestGetTeacher.onload = function () {

        // if request is success ☻
        if (requestGetTeacher.status >= 200 && requestGetTeacher.status <= 300) {
            sessionStorage.setItem('teacher', JSON.stringify(requestGetTeacher.response));
            callback()
        }
        // if request is wrong 
        else {
            iziToast.error({
                title: 'System Error',
                zindex: 999,
                overlay: true,
                progressBar: false,
                timeout: false,
                position: 'topCenter',
                message: 'you have try refresh page or Get back to us in a few minutes ',
                buttons: [
                    ['<button>Refresh</button>', function (instance, toast) {
                        instance.hide({
                            transitionOut: 'fadeOutUp',
                            onClosing: function (instance, toast, closedBy) {
                                console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
                                window.location.reload(); // Reload the page
                            }
                        }, toast, 'buttonName');
                    }]
                ],
            });
        }
    }
}
