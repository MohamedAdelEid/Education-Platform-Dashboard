// Request Get Subject

// Get the current URL
const currentUrl = window.location.href;
const url = new URL(currentUrl);

// Get the ID subject from the URL
const subjectId = url.searchParams.get('id');


let requestGetSubject = new XMLHttpRequest();
requestGetSubject.open("GET", `http://edu1.runasp.net/api/subject/${subjectId}`);
requestGetSubject.responseType = "json";
requestGetSubject.send();


requestGetSubject.onload = function () {

    // if request is success ☻
    if (requestGetSubject.status >= 200 && requestGetSubject.status <= 300) {
        let subjectData = requestGetSubject.response;
        data(subjectData);
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

function data(subject) {

    //======================== /* view subject */ ========================

    // add content subject
    var contentSubject = document.querySelector('.content-view-subject');

    if (contentSubject) {
        contentSubject.innerHTML =
            `<div class="mb-3">
                                        <p class="label-text">المادة الدراسية</p>
                                        <p class="content-text m-0">${subject.subjName}</p>
                                    </div>

                                    <div class="d-flex align-items-center justify-content-between mb-3">

                                        <div>
                                            <p class="label-text">الصف الدراسي</p>
                                            <p class="content-text m-0">${subject.level}</p>
                                        </div>

                                        <div>
                                            <p class="label-text">الفصل الدراسي</p>
                                            <p class="content-text m-0">${subject.term == 1 ? 'الفصل الاول' : 'الفصل الثاني'}</p>
                                        </div>

                                    </div>

                                    <div class="mb-3">
                                        <p class="label-text">وصف المادة</p>
                                        <p class="content-text m-0">${subject.describtion}</p>
                                    </div>

                                    <div class="d-flex align-items-center justify-content-between mb-3">

                                        <p class="label-text">سعر المادة</p>

                                        <p class="price-subject m-0">${subject.totalPrice == 0 ? "لا يوجد سعر للمادة " : `${subject.totalPrice} جنية`}</p>

                                    </div>  

                                    <div class="d-flex align-items-center justify-content-between mb-3">

                                        <p class="label-text">سعر الحصة</p>

                                        <p class="price-subject m-0">${subject.pricePerHour} جنية</p>

                                    </div>

                                    <div class="d-flex align-items-center justify-content-between mb-3">

                                        <p class="label-text">مكان المادة</p>

                                        <p class="text-success fw-bold m-0">${subject.isOnilne == true ? "اونلاين ," : ''} اوفلاين</p>

                                    </div>

                                    <div class="d-flex align-items-center justify-content-between mb-3">

                                        <p class="label-text">الحالة</p>

                                        ${subject.isActive == true ?
                `<p class="text-success fw-bold m-0"> <i class="fa-solid fa-check-double ms-2"></i>نشطة</p>`
                :
                `<p class="text-danger fw-bold m-0"> <i class="fa-solid fa-x ms-2"></i>غير نشطة</p>`
            }

                                    </div>

                                    <div class="d-flex align-items-center justify-content-between mb-3">

                                        <p class="label-text">عدد الاختبارات</p>

                                        <p class="num-quiz m-0">${subject.quizCount} <a href="../quiz/add-quiz.html"><i class="fa-solid fa-plus me-2"></i></a></p>

                                    </div>

                                    <div class="d-flex align-items-center justify-content-between mb-4">

                                        <p class="label-text">عدد الطلاب المسجلين بالمادة : <span class="fw-bold">${subject.studentCount}</span></p>

                                        <a href="show-student.html?id=${subject.subjectId}" class="link-view">عرض</a>

                                    </div>

                                    <a href="edit-subject.html?id=${subject.subjectId}" class="primary-btn text-white text-decoration-none d-block fs-5 text-center">تعديل المادة</a>`

    }


    //======================== /* edit subject */ ========================

    // add value to edit form 
    const formEditSubject = document.querySelector('.editSubject');

    if (formEditSubject) {

        // add value to name-select
        const optionsNameSubject = [...document.getElementById('name-subject').options];
        optionsNameSubject.forEach(option => {
            if (option.textContent == subject.subjName) {
                option.selected = true;
            }
        });

        //add value to level-subject
        const optionsLevelSubject = [...document.getElementById('level-subject').options];
        optionsLevelSubject.forEach(option => {
            if (option.value == subject.level) {
                option.selected = true;
            }
        });

        //add value to term-subject
        const optionsTermSubject = [...document.getElementById('term-subject').options];
        optionsTermSubject.forEach(option => {
            if (option.value == subject.term) {
                option.selected = true;
            }
        });

        //add value to price-hour-subject
        const optionsPriceHourSubject = [...document.getElementById('price-subject-hour').options];
        optionsPriceHourSubject.forEach(option => {
            if (option.value == subject.pricePerHour) {
                option.selected = true;
            }
        });
        
        //add value to is-online
        const optionsIsOnlineSubject = [...document.getElementById('is-online').options];
        optionsIsOnlineSubject.forEach(option => {
            if (option.value == subject.isOnilne) {
                option.selected = true;
            }
        });

        //add value to is-active
        const optionsIsActiveSubject = [...document.getElementById('is-active').options];
        optionsIsActiveSubject.forEach( option => {
            if (option.value == subject.isActive) {
                option.selected = true;
            }
        });

        //add value to total price
        const totalPriceSubject = document.getElementById('price-subject-total');
        totalPriceSubject.value = subject.totalPrice;
        
        //add value to description subject
        const descriptionSubject = document.getElementById('desc-subject');
        descriptionSubject.textContent = subject.describtion;
        

    }
}
