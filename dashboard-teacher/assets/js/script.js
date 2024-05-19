
//toggle close and open sidebar
const sidebarToggles = document.querySelectorAll(".sidebar-toggle");

sidebarToggles.forEach(toggle => {
    toggle.addEventListener("click", function () {
        document.querySelector("#sidebar").classList.toggle("collapsed");
    });
});

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