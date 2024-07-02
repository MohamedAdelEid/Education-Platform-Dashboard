// Request Get All Subjects Teacher

// Get the ID Teacher from local storage
const teacherId = localStorage.getItem('teacherId');

let requestGetSubjects = new XMLHttpRequest();
requestGetSubjects.open("GET", `http://edu1.runasp.net/api/subject/${teacherId}/subjects`);
requestGetSubjects.responseType = "json";
requestGetSubjects.send();

requestGetSubjects.onload = function () {

    // if request is success ☻
    if (requestGetSubjects.status >= 200 && requestGetSubjects.status <= 300) {
        let subjectsData = requestGetSubjects.response;
        data(subjectsData);

        // store id subjects in localstorage
        let subjects = [];
        for (let subject of subjectsData) {
            subjects.push({ id: subject.subjectId, name: subject.subjName });
        }
        let subjectIdsJson = JSON.stringify(subjects);
        localStorage.setItem('subjects', subjectIdsJson);

    }
    // if request is wrong 
    else {
        var showSubjects = document.getElementById("show-subjects");
        if (showSubjects) {
            showSubjects.innerHTML += `<h1 class="text-danger"> لا يوجد مواد</h1>`
        }
        var selectSubject = document.getElementById("select-subjects");
        if (selectSubject) {
            selectSubject.innerHTML += `<option disabled>لا يوجد مواد</option>`
        }

    }
}

// ==========================/* show */=================================

function data(subjects) {

    // ==================/* add-quiz page*/=====================
    // add subjects teacher to options in

    var selectSubject = document.getElementById("select-subjects");
    console.log(subjects.length)
    if (selectSubject) {
        if (subjects.length > 0) {
            // Parse the JSON string back to an array of objects
            // add subjects to options in add-quiz page  
            for (subject of subjects) {
                selectSubject.innerHTML += `<option value="${subject.subjectId}"> ${subject.subjName} </option>`;
            }
        }
    }

    //  // ==================/* show-subjects page*/=====================
    // show subjects teacher
    var showSubjects = document.getElementById("show-subjects");
    if (showSubjects) {
        if (subjects.length > 0) {
            // Parse the JSON string back to an array of objects
            for (subject of subjects) {
                showSubjects.innerHTML += `<div class="subject col-12 col-sm-6 col-lg-6 col-xl-4 mb-4">
                                                                    <div class="subject-child d-flex">
                                                                        <div class="desc-subject">

                                                                            <!-- name subject -->
                                                                            <p class="title-subject text-primary fw-bold">${subject.subjName}</p>

                                                                            <!-- level subject  -->
                                                                            <p class="sub-title-subject"><i class="fa-solid fa-chart-simple ms-1"></i>
                                                                            ${subject.level}</p>

                                                                            <p class="sub-title-subject"><i class="fa-solid fa-sort ms-1"></i>
                                                                            ${subject.term == 1 ? "الترم الاول" : "الترم التاني"}</p>

                                                                            <!-- date creation subject -->
                                                                            <p class="sub-title-subject"><i class="fa-solid fa-calendar-days ms-1"></i>${formatDate(subject.addingTime)}</p>

                                                                            <!-- price course -->
                                                                            ${subject.totalPrice == 0 ? '' : `<p class="sub-title-subject"><i class="fa-solid fa-money-check ms-1"></i><span
                                                                                    class="fw-bold">${subject.totalPrice}</span> <span class="">جنية للمادة</span></p>`}
                                                                            
                                                                            <!-- price houre -->
                                                                            <p class="sub-title-subject"><i class="fa-solid fa-money-check ms-1"></i><span
                                                                                    class="fw-bold">${subject.pricePerHour} </span><span class="">جنية لكل حصة </span></p>
                                                                            
                                                                            <!-- price houre -->
                                                                            ${subject.isActive == true ?
                        `<p class="sub-title-subject text-success fw-bold"><i class="fa-solid fa-check-double ms-1 fw-bold"></i><span
                                                                            class=""> <span class="">نشطة</span></span></p>`
                        :
                        `<p class="sub-title-subject text-danger fw-bold"><i class="fa-solid fa-x ms-1 fw-bold"></i><span
                                                                            class=""> <span class="">غير نشطة </span></span></p>`}
                                                                            

                                                                            <div class="btn-show-subject"><a href="view-subject.html?id=${subject.subjectId}">عرض المادة</a></div>

                                                                        </div>
                                                                        <div class="img-subject position-relative">

                                                                            <div class="btn-delete deleteSubject">
                                                                                <button ><i class="fa-solid fa-trash" onclick="deleteSubject(${subject.subjectId})"></i></button>
                                                                            </div>

                                                                            <img src="../../assets/imgs/subject/math - .jpg" alt="">

                                                                        </div>
                                                                    </div>
                                                                </div>`;
            }
        } else {
            showSubjects.innerHTML += `<h1> لا يوجد مواد</h1>`
        }
    }

}