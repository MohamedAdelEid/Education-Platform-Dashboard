// Request Get Subject

// Get the current URL
const currentUrl = window.location.href;
const url = new URL(currentUrl);

// Get the ID subject from the URL
const questionId = url.searchParams.get('id');
const numQuestion = url.searchParams.get('n');


let requestGetQuestion = new XMLHttpRequest();
requestGetQuestion.open("GET", `http://edu1.runasp.net/api/questions/${questionId}`);
requestGetQuestion.responseType = "json";
requestGetQuestion.send();


requestGetQuestion.onload = function () {

    // if request is success ☻
    if (requestGetQuestion.status >= 200 && requestGetQuestion.status <= 300) {
        let questionData = requestGetQuestion.response;
        data(questionData);
    }
    // if request is wrong 
    else {
        // Show warning message using iziToast
        iziToast.warning({
            title: 'حاول مرة اخري !',
            position: 'topRight'
        });
    }
}

function data(question) {

    //======================== /* edit question */ ========================

    var editQuestionForm = document.querySelector('.editQuestion');

    if (editQuestionForm) {

        // add old value to content question 
        document.querySelector('#name-question').value = question.content;

        // add old value to option 1  
        document.querySelector('#input1').value = question.option1;

        // add old value to option 2
        document.querySelector('#input2').value = question.option2;

        // add old value to option 3 
        document.querySelector('#input3').value = question.option3;

        // add old value to option 4 
        document.querySelector('#input4').value = question.option4;

        // print number of question 
        document.querySelector('.editCountQuestion').textContent = numQuestion;

        if(question.option1 == question.correctAnswer){
            document.querySelector('#radio1').checked = true ;
        }
        if(question.option2 == question.correctAnswer){
            document.querySelector('#radio2').checked = true ;
        }
        if(question.option3 == question.correctAnswer){
            document.querySelector('#radio3').checked = true ;
        }
        if(question.option4 == question.correctAnswer){
            document.querySelector('#radio4').checked = true ;
        }

    }
}