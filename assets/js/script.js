function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    elements.forEach(element => {
        const file = element.getAttribute('data-include');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
                element.removeAttribute('data-include');
                includeHTML(); // Re-run for nested includes if any
            })
            .catch(error => console.error('Error loading file:', error));
    });
}

// Run the function on page load
document.addEventListener('DOMContentLoaded', includeHTML);

// =====================================

// Encapsulate the slider functionality in a function
function initializeSlider() {
    let slider = document.querySelector('.slider .list');
    let items = document.querySelectorAll('.slider .list .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let dots = document.querySelectorAll('.slider .dots li');

    let lengthItems = items.length - 1;
    let active = 0;

    next.onclick = function () {
        active = active + 1 <= lengthItems ? active + 1 : 0;
        reloadSlider();
    }

    prev.onclick = function () {
        active = active - 1 >= 0 ? active - 1 : lengthItems;
        reloadSlider();
    }

    let refreshInterval = setInterval(() => { next.click() }, 3000);

    function reloadSlider() {
        slider.style.left = -items[active].offsetLeft + 'px';

        let last_active_dot = document.querySelector('.slider .dots li.active');
        if (last_active_dot) {
            last_active_dot.classList.remove('active');
        }

        dots[active].classList.add('active');

        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => { next.click() }, 3000);
    }

    dots.forEach((li, key) => {
        li.addEventListener('click', () => {
            active = key;
            reloadSlider();
        })
    });

    window.onresize = function (event) {
        reloadSlider();
    };
}

// Call the initializeSlider function only when needed
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.slider .list')) {
        initializeSlider();
    }
});

// end slider login

// start show password 

const passwordIcon = document.querySelectorAll('.password__icon');
const authPassword = document.querySelectorAll('.auth__password');

for (let i = 0; i < passwordIcon.length; ++i) {
    passwordIcon[i].addEventListener('click', (event) => {
        const inputField = event.currentTarget.parentElement.querySelector('input');
        if (event.target.classList.contains('fa-eye-slash')) {
            event.target.classList.remove('fa-eye-slash');
            event.target.classList.add('fa-eye');
            inputField.type = 'text';
        } else {
            event.target.classList.add('fa-eye-slash');
            event.target.classList.remove('fa-eye');
            inputField.type = 'password';
        }
    });
}


// end show password 

// =================================

function validateForm_1() {
    var quizName = document.getElementById("name-quiz").value.trim();
    var errorMessage = document.getElementById("errorMessage");
    var invalidChars = ["*", "#", "$", "@", "!", "%", "^", "&", "~"]; // Add more characters as needed

    if (quizName === "") {
        errorMessage.innerText = "من فضلك هذا الحقل مطلوب .";
        return false;
    } else {
        for (var i = 0; i < invalidChars.length; i++) {
            if (quizName.includes(invalidChars[i])) {
                errorMessage.innerText = "من فضلك اسم الإختبار لا يمكن أن يحتوى على هذه الرموز[*, #, $,@,!,%,^,&,~]";
                return false;
            }
        }
    }
    errorMessage.innerText = "";
    return true;
}

//

function validateForm_2() {
    var subject = document.getElementById("desc-subject").value.trim();
    var errorMessage = document.getElementById("errorMessage_2");
    var invalidChars = ["*", "#", "$", "@", "!", "%", "^", "&", "~"]; // Add more characters as needed
    var arabicRegex = /^[\u0600-\u06FF\s]+$/; // Regular expression for Arabic characters

    if (subject === "") {
        errorMessage.innerText = "من فضلك هذا الحقل مطلوب .";
        return false;
    } else {
        for (var i = 0; i < invalidChars.length; i++) {
            if (subject.includes(invalidChars[i])) {
                errorMessage.innerText = "من فضلك وصف المادة لا يمكن أن يحتوى على هذه الرموز[*, #, $,@,!,%,^,&,~]";
                return false;
            }
            else if (!arabicRegex.test(subject)) {
                errorMessage.innerText = "من فضلك وصف المادة لا يمكن أن يحتوي على حروف إنجليزية";
                return false;
            }
        }
    }
    errorMessage.innerText = "";
    return true;
}


// ================================================================================

document.addEventListener("DOMContentLoaded", function () {
    // Get the current URL path
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();

    // Select all sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-nav .sidebar-item');

    // Loop through each link
    sidebarLinks.forEach(function (link) {
        // Check if the link's href matches the current path
        if (link.getAttribute('href') === currentPage) {
            // Add the 'active' class to the link
            link.classList.add('active');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the current URL path
    const currentPath = window.location.pathname;
    const currentPageSubMenu = currentPath.split('/').pop();

    // Select all sidebar links
    const sidebarLinksSubMenu = document.querySelectorAll('.sidebar-nav .submenu li a');

    // Loop through each link
    sidebarLinksSubMenu.forEach(function (link) {
        // Check if the link's href matches the current path
        if (link.getAttribute('href') === currentPageSubMenu) {
            // Add the 'active' class to the link
            link.parentElement.classList.add('active');
        }
    });
});



// ===============================

//toggle close and open sidebar
const sidebarToggles = document.querySelectorAll(".sidebar-toggle");

sidebarToggles.forEach(toggle => {
    toggle.addEventListener("click", function () {
        document.querySelector("#sidebar").classList.toggle("collapsed");
    });
});

// =================================

// change type input search to submit when has value
document.addEventListener('DOMContentLoaded', function () {
    var searchButton = document.getElementById('searchButton');
    var searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', function () {
        searchInput.focus();
    });

    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() !== '') {
            searchButton.setAttribute('type', 'submit');
        } else {
            searchButton.setAttribute('type', 'button');
        }
    });
});

// ===================================

document.addEventListener('DOMContentLoaded', function () {
    // Get all elements with class 'control-hide'
    var controlHideElements = document.querySelectorAll('.control-hide');

    // Loop through each element
    controlHideElements.forEach(function (element) {
        // Add event listener to toggle 'hide' class
        element.addEventListener('click', function (event) {
            event.preventDefault();

            // Get the next sibling which should be the submenu
            var submenu = element.nextElementSibling;

            // Toggle the 'hide' class on the submenu
            submenu.classList.toggle('hide');

            // Check if submenu is visible
            var isVisible = !submenu.classList.contains('hide');

            // Apply transition based on visibility
            if (isVisible) {
                submenu.style.height = submenu.scrollHeight + 'px';
            } else {
                submenu.style.height = '0px';
            }
        });
    });
});

// ===========================

function formatDate(isDateString) {
    // Parse the ISO 8601 date string into a Date object
    const date = new Date(isDateString);

    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    // Format the extracted values into the desired format
    return `${day} | ${month} | ${year}`;
}

// ===================================

// dispaly teacher data  
document.addEventListener('DOMContentLoaded', function () {
    var teacherData = sessionStorage.getItem('teacher');
    if (teacherData) {
        var teacher = JSON.parse(teacherData);

        // name in navbar
        var teacherNameElements = document.querySelectorAll('.teacherName');
        teacherNameElements.forEach(function (element) {
            element.textContent = teacher.firstName + " " + teacher.lastName; // Concatenate additional text
        });

        var profileImg = document.querySelector('#profile-image');

        profileImg.src = teacher.profileImageUrl == null ? '../../assets/imgs/default.jpg' : teacher.profileImageUrl;

    }
});