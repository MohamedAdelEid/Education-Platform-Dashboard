import '../../../validation.js';

// Validation on inputs
export function validationQuestion() {
    let isValid = true;

    // Name Question
    const valueNameQuestion = document.querySelector('#name-question').value;
    const errorNameQuestion = document.querySelector('.error-name-question');
    isValid &= validationDirect('محتوي السؤال', valueNameQuestion, errorNameQuestion);

    // Option One Question
    const valueOptionOneQuestion = document.querySelector('.option.one').value;
    const errorOptionOneQuestion = document.querySelector('.error-option-one-question');
    isValid &= validationDirect('الاختيار الاول', valueOptionOneQuestion, errorOptionOneQuestion);

    // Option Two Question
    const valueOptionTwoQuestion = document.querySelector('.option.two').value;
    const errorOptionTwoQuestion = document.querySelector('.error-option-two-question');
    isValid &= validationDirect('الاختيار الثاني', valueOptionTwoQuestion, errorOptionTwoQuestion);

    // Option Three Question
    const valueOptionThreeQuestion = document.querySelector('.option.three').value;
    const errorOptionThreeQuestion = document.querySelector('.error-option-three-question');
    isValid &= validationDirect('الاختيار الثالث', valueOptionThreeQuestion, errorOptionThreeQuestion);

    // Option Four Question
    const valueOptionFourQuestion = document.querySelector('.option.four').value;
    const errorOptionFourQuestion = document.querySelector('.error-option-four-question');
    isValid &= validationDirect('الاختيار الرابع', valueOptionFourQuestion, errorOptionFourQuestion);

    // Validate radio buttons for correct answer
    const radioCorrectAnswer = document.querySelectorAll('.radio-button__input');
    const errorCheckCorrect = document.querySelector('.error-check-correct');
    if (!validateRadioButtons(radioCorrectAnswer, errorCheckCorrect)) {
        isValid = false;
    }

    return isValid;
}

function validationDirect(nameInput, valueInput, errorInput) {
    const validationObject = new Validation(nameInput, valueInput);

    // Perform required field validation
    if (validationObject.required()) {
        errorInput.textContent = validationObject.required();
        return false;
    }
    // Perform Arabic validation
    if (validationObject.noSpecialCharacters()) {
        errorInput.textContent = validationObject.noSpecialCharacters();
        return false;
    }

    errorInput.textContent = '';
    return true;
}

function validateRadioButtons(radioButtons, errorElement) {
    for (const radio of radioButtons) {
        if (radio.checked) {
            errorElement.textContent = '';
            return true;
        }
    }
    errorElement.textContent = 'يجب اختيار احد الخيارات';
    return false;
}

export function setValueToRadioInputs(inputId, radioId) {
    const inputElement = document.getElementById(inputId);
    const radioElement = document.getElementById(radioId);

    radioElement.value = inputElement.value;
}

// Get the current URL
const currentUrl = window.location.href;
const url = new URL(currentUrl);
// Get the ID quiz from the URL
const quizId = url.searchParams.get('q');

if (document.querySelector(".quizId")) {
    document.querySelector(".quizId").value = quizId;
}

// Request Post question "create new question"
const formCreateQuestion = document.querySelector('.createQuestion');

if (formCreateQuestion) {
    formCreateQuestion.addEventListener('submit', event => {
        event.preventDefault();

        if (validationQuestion()) {
            // Set value to radio input
            setValueToRadioInputs('input1', 'radio1');
            setValueToRadioInputs('input2', 'radio2');
            setValueToRadioInputs('input3', 'radio3');
            setValueToRadioInputs('input4', 'radio4');

            // Collect the form data
            const objectQuestionData = new FormData(formCreateQuestion);

            // Convert the FormData object to a plain JavaScript object
            const questionData = Object.fromEntries(objectQuestionData);

            // Convert the JavaScript object to a JSON string
            const questionDataJson = JSON.stringify(questionData);

            console.log(questionDataJson);

            // Send the JSON data to the server using fetch
            fetch('http://edu1.runasp.net/api/questions', {
                method: 'POST',
                body: questionDataJson,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                // Check if the response status is ok (200-299)
                if (response.ok) {
                    localStorage.setItem('successCreateQuestion', 'تم إضافة السؤال بنجاح');
                    window.location.reload();
                } else {
                    // Show warning message using iziToast
                    iziToast.warning({
                        title: 'حاول مرة اخرى!',
                        position: 'topRight'
                    });
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
                    title: 'الشبكة غير مستقره',
                    position: 'topRight'
                });
            });
        }
    });
}
