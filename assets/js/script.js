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
