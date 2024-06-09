// Request Get Subject teacher

// Get the ID Teacher from local storage
const teacherId = localStorage.getItem('teacherId');

let requestGetSubjects = new XMLHttpRequest();
requestGetSubjects.open("GET", `http://edu1.runasp.net/api/subject/${teacherId}/subjects`);
requestGetSubjects.responseType = "json";
requestGetSubjects.send();
requestGetSubjects.onload = function () {

    // if request is success ☻
    if (requestGetSubjects.status >= 200 && requestGetSubjects.status <= 300) {
        subjects = requestGetSubjects.response;
        localStorage.setItem('subjects', JSON.stringify(subjects));
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

// add subjects teacher to options in add-quiz page 
var subjectsString = localStorage.getItem('subjects');
var selectSubject = document.getElementById("select-subjects");
var subjects = JSON.parse(subjectsString);

if (selectSubject) {
    if (subjectsString !== null) {
        // Parse the JSON string back to an array of objects
        // add subjects to options in add-quiz page  
        for (subject of subjects) {
            selectSubject.innerHTML += `<option value="${subject.subjectId}"> ${subject.subjName} </option>`;
        }
    } else {
        selectSubject.innerHTML += `<option disabled>لا يوجد مواد</option>`
    }
}

// show subjects teacher in page show-subjects

var showSubjects = document.getElementById("show-subjects");
if (showSubjects) {
    if (subjectsString !== null) {
        // Parse the JSON string back to an array of objects
        for (subject of subjects) {
            showSubjects.innerHTML += `<div class="subject col-12 col-sm-6 col-lg-4 col-xl-4 mb-4">
                                                                    <div class="subject-child d-flex">
                                                                        <div class="desc-subject">

                                                                            <!-- name subject -->
                                                                            <p class="title-subject">${subject.subjName}</p>

                                                                            <!-- level subject  -->
                                                                            <p class="sub-title-subject"><i class="fa-solid fa-chart-simple ms-1"></i>
                                                                            ${subject.level}</p>

                                                                            <p class="sub-title-subject"><i class="fa-solid fa-sort ms-1"></i>
                                                                            ${subject.term == 1 ? "الترم الاول" : "الترم التاني"}</p>

                                                                            <!-- date creation subject -->
                                                                            <p class="sub-title-subject"><i class="fa-solid fa-calendar-days ms-1"></i>${formatDate(subject.addingTime)}</p>

                                                                            <!-- num of student in suject -->
                                                                            <p class="sub-title-subject"><i class="fa-solid fa-money-check ms-1"></i><span
                                                                                    class="fw-bold">${subject.pricePerHour} <span class="text-primary">جنية لكل ساعة </span></span></p>

                                                                            <div class="btn-show-subject"><a href="view-subject.html?ids=${subject.subjectId}">عرض المادة</a></div>

                                                                        </div>
                                                                        <div class="img-subject position-relative">

                                                                            <form action="" class="btn-delete" id="deleteSubject">
                                                                                <button type="submit"><i class="fa-solid fa-trash"></i></button>
                                                                            </form>

                                                                            <img src="assets/imgs/subject/math - .jpg" alt="">

                                                                        </div>
                                                                    </div>
                                                                </div>`;
        }
    } else {
        showSubjects.innerHTML += `<h1> لا يوجد مواد</h1>`
    }
}