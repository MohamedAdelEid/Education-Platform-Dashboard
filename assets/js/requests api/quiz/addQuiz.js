
// Request Post Quiz "create new quiz"
const formCreateQuiz = document.querySelector('.createQuiz');

if (formCreateQuiz) {
    formCreateQuiz.addEventListener('submit', event => {
        if (validateForm_1()) {
            event.preventDefault();

            // Collect the form data
            const objectQuizData = new FormData(formCreateQuiz);

            // Convert the FormData object to a plain JavaScript object
            const quizData = Object.fromEntries(objectQuizData);

            // Convert the JavaScript object to a JSON string
            const quizDataJson = JSON.stringify(quizData);

            // Send the JSON data to the server using fetch
            fetch('http://edu1.runasp.net/api/quiz', {
                method: 'POST',
                body: quizDataJson,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    // Check if the response status is ok (200-299)
                    if (response.ok) {
                        return response.json(); // Convert the response to JSON
                    } else {
                        // Show warning message using iziToast
                        iziToast.warning({
                            title: 'حاول مرة اخري !',
                            position: 'topRight'
                        });
                        throw new Error('Failed to create quiz');
                    }
                })
                .then(data => {
                    // Show success message using iziToast
                    iziToast.success({
                        title: 'تم إضافة الاختبار بنجاح',
                        position: 'topRight'
                    });

                    // Add the new quiz to the DOM
                    let lastQuizsHtml = document.querySelector(".lastQuizs");
                    lastQuizsHtml.innerHTML = `<div class="footer-add-quiz border-bottom  d-flex align-items-center justify-content-between">
                                                        <div class="d-flex align-items-center">
                                                            <p class="name-quiz">${data.description}</p> <!-- Assuming data has a 'description' property -->
                                                        </div>
                                                        <form action="add-question.html" method="get" class="">
                                                            <input type="hidden" name="q" value="${data.id}">
                                                            <button type="submit" class="add-question d-flex align-items-center">
                                                            إضافة اسئلة <div><i class="fa-solid fa-plus mb-0"></i></div>
                                                            </button>
                                                        </form>
                                                    </div>` + lastQuizsHtml.innerHTML;

                }).catch(error => {
                    // Handle any errors
                    console.error('Error:', error);
                    // Show error message using iziToast
                    iziToast.error({
                        title: 'الشبكة غير مستقره ',
                        position: 'topRight'
                    });
                });
        }
    });
}


