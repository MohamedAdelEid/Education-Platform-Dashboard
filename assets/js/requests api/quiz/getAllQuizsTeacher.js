import '../subject/getAllSubjectsTeacherRequest.js';

let requestGetQuizs = new XMLHttpRequest();
requestGetQuizs.open("GET", "http://edu1.runasp.net/api/quiz");
requestGetQuizs.responseType = "json";
requestGetQuizs.send();
requestGetQuizs.onload = function () {
    // if request is success ☻
    if (requestGetQuizs.status >= 200 && requestGetQuizs.status <= 300) {
        let quizs = requestGetQuizs.response;

        dispalyAllQuiz(quizs);

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

function dispalyAllQuiz(quizs) {
    const quizDataJson = JSON.stringify(quizs);

    const quizArray = JSON.parse(quizDataJson);


    // if (displayRowQuiz) {
    var displayRowQuiz = document.querySelector('.display-row-quiz')


    let subjectIdsJson = localStorage.getItem('subjects');
    let subjects = JSON.parse(subjectIdsJson);

    quizArray.forEach(quiz => {

        if (subjects) {

            subjects.forEach(subject => {

                if (subject.id == quiz.subjectId) {

                    const rowHTML = `
                    <tr class="body-table text-center border-bottom display-row-quiz">
                        <td>${quiz.description}</td>
                        <td>${subject.name}</td>
                        <td>${formatDate(quiz.createdDate)}</td>
                        <td>
                            <form action="add-question.html" method="get" class="d-flex justify-content-center">
                                <input type="hidden" name="q" value="${quiz.id}">
                                <button class="primary-btn d-flex align-items-center py-1"> إضافة اسئلة <i
                                        class="fa-solid fa-plus me-2"></i></button>
                            </form>
                        </td>
                        <td class="">
                            <div class="d-flex align-items-center justify-content-center">
                                <!-- delete row -->
                                <div class="fit-content"><button onclick="deleteQuiz(${quiz.id})"
                                                                    class="delete-btn d-flex justify-content-center align-items-center"><i
                                                                        class="fa-solid fa-trash fs-6"></i></button>
                                                            </div>
                                <!-- edit row -->
                                <form action="" class="fit-content me-2"><button
                                        class="edit-btn d-flex justify-content-center align-items-center"><i
                                            class="fa-solid fa-pen-to-square"></i></button>
                                </form>
                            </div>
                        </td>
                    </tr>
                `
                    displayRowQuiz.innerHTML += rowHTML;
                } else {

                }

            });

        }


    })

}