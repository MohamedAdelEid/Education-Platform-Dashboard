// Get the current URL
const currentUrl = window.location.href;
const url = new URL(currentUrl);

// Get the ID subject from the URL
const subjectId = url.searchParams.get('id');


let requestGetStudent = new XMLHttpRequest();
requestGetStudent.open("GET", `http://edu1.runasp.net/api/enrollment/subject/${subjectId}`);
requestGetStudent.responseType = "json";
requestGetStudent.send();
requestGetStudent.onload = function () {
    // if request is success ☻
    if (requestGetStudent.status >= 200 && requestGetStudent.status <= 300) {
        let students = requestGetStudent.response;

        dispalyAllStudent(students);

        // Get the last 3 quizzes

    }// if request is wrong 
    else {
        iziToast.error({
            title: 'خطأ في النظام !',
            zindex: 999,
            overlay: true,
            progressBar: false,
            timeout: false,
            position: 'topCenter',
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

function dispalyAllStudent(students) {
    const studentDataJson = JSON.stringify(students);

    const studentArray = JSON.parse(studentDataJson);


    // if (displayRowQuiz) {
    var displayRowStudent = document.querySelector('.display-row-students')

    studentArray.forEach(student => {

        const rowHTML = `
                    <tr class="body-table text-center border-bottom display-row-quiz">
                        <td>${student.stDto.firstName} ${student.stDto.lastName}</td>
                        <td>${student.stDto.phone == null ? 'ليس لدية رقم' : student.stDto.phone}</td>
                        <td>${student.stDto.email == null ? 'ليس لدية ايميل' : student.stDto.email}</td>
                        <td>${student.stDto.level}</td>
                    </tr>
                `
                displayRowStudent.innerHTML += rowHTML;
    });
}