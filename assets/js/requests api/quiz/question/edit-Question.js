import { validationQuestion, setValueToRadioInputs } from './addQuestion.js';

// Get the current URL
const currentUrl = window.location.href;
const url = new URL(currentUrl);

// Get the ID Question from the URL
const questionId = url.searchParams.get('id');
const numQuestion = url.searchParams.get('n');
const quizIdForQuestion = url.searchParams.get('q');

// Ensure questionId is fetched correctly
console.log('Question ID:', questionId);

if (document.querySelector(".edit-quizId")) {
    document.querySelector(".edit-quizId").value = quizIdForQuestion;
}

// Select the form element
const formEditQuestion = document.querySelector('.editQuestion');

// Check if the form is found
if (formEditQuestion) {
    formEditQuestion.addEventListener('submit', event => {
        event.preventDefault();
        if (validationQuestion()) {


            setValueToRadioInputs('input1', 'radio1');
            setValueToRadioInputs('input2', 'radio2');
            setValueToRadioInputs('input3', 'radio3');
            setValueToRadioInputs('input4', 'radio4');

            // Collect the form data
            const formDataQuestion = new FormData(formEditQuestion);

            // Convert the FormData object to a plain JavaScript object
            const questionData = Object.fromEntries(formDataQuestion.entries());

            // Convert the JavaScript object to a JSON string
            const questionDataJson = JSON.stringify(questionData);

            // Ensure questionDataJson is created correctly
            console.log('Question Data JSON:', questionDataJson);

            // Send the JSON data to the server using fetch
            fetch(`http://edu1.runasp.net/api/questions/${questionId}`, {
                method: 'PUT',
                body: questionDataJson,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Show success message using iziToast
                        localStorage.setItem('successEditQuestion', 'تم تحديث السؤال بنجاح');
                        window.location.href = `add-question.html?q=${quizIdForQuestion}`;
                    } else {
                        // Show warning message using iziToast
                        iziToast.warning({
                            title: 'حاول مرة اخرى!',
                            position: 'topRight'
                        });

                        window.location.href = `edit-question.html?id=${questionId}&n=${numQuestion}&q=${quizIdForQuestion}`;
                    }
                    // Convert the response to JSON
                    return response.json();
                })
                .then(data => console.log(data)) // Log the response data
                .catch(error => {
                    // Handle any errors
                    console.error('Error:', error);
                    // Show error message using iziToast
                    iziToast.error({
                        title: 'الشبكة غير مستقرة',
                        position: 'topRight'
                    });
                });
        }
    });
} else {
    console.error('Form element not found');
}
