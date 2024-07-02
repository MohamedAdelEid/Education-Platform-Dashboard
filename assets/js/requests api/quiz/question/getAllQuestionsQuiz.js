// Request Get Questions 

// Get the current URL
const currentUrl = window.location.href;
const url = new URL(currentUrl);
// Get the ID quiz from the URL
const quizId = url.searchParams.get('q');
document.querySelector(".quizId").value = quizId;

function displayQuestions() {
    let requestGetQuestions = new XMLHttpRequest();
    requestGetQuestions.open("GET", `http://edu1.runasp.net/api/questions/byquiz/${quizId}`);
    requestGetQuestions.responseType = "json";
    requestGetQuestions.send();
    requestGetQuestions.onload = function () {
        // if request is success ☻
        if (requestGetQuestions.status >= 200 && requestGetQuestions.status <= 300) {
            let questions = requestGetQuestions.response;

            let questionsHtml = document.querySelector(".quetions-html");
            questionsHtml.innerHTML = ''; // Clear the existing content

            let countQuestion = 1;
            for (let question of questions) {
                questionsHtml.innerHTML += `<table class="w-100">
                                                <tr class="d-flex justify-content-between align-items-center">
                                                    <td>
                                                        <p class="question mb-0"><span class="fw-bold">${countQuestion}</span>
                                                            ${question.content}
                                                            </p>
                                                    </td>
                                                    <td>
                                                        <div class="d-flex align-items-center me-1">
                                                            <!-- delete row -->
                                                            <div class="fit-content"><button onclick="deleteQuestion(${question.id})"
                                                                    class="delete-btn d-flex justify-content-center align-items-center"><i
                                                                        class="fa-solid fa-trash fs-6"></i></button>
                                                            </div>
                                                            <!-- edit row -->
                                                            <div class="fit-content me-1"><a href="edit-question.html?q=${quizId}&id=${question.id}&n=${countQuestion}"
                                                                    class="edit-btn d-flex justify-content-center align-items-center"><i
                                                                        class="fa-solid fa-pen-to-square fs-6"></i></a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>`;
                                            countQuestion++;
                                        }

            document.querySelector('.countQuestion').textContent = countQuestion;

        }
        // if request is wrong 
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
}

displayQuestions();