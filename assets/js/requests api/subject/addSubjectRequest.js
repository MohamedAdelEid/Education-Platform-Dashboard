// Get the ID Teacher from local storage
const teacherId = localStorage.getItem('teacherId');
document.querySelector(".teacherSubjectInput").value = teacherId;


// Request Post Subject "create new subject"
const formCreateSubject = document.querySelector('.createSubject');

formCreateSubject.addEventListener('submit', event => {
    if (validateForm_2()) {
        event.preventDefault();

        // Collect the form data
        const objectSubjectData = new FormData(formCreateSubject);

        // Convert the FormData object to a plain JavaScript object
        const subjectData = Object.fromEntries(objectSubjectData);

        // Convert the JavaScript object to a JSON string
        const subjectDataJson = JSON.stringify(subjectData);

        console.log(subjectDataJson);

        // Send the JSON data to the server using fetch
        fetch('http://edu1.runasp.net/api/subject', {
            method: 'POST',
            body: subjectDataJson,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                // Check if the response status is ok (200-299)
                if (response.ok) {
                    // Show success message using iziToast
                    localStorage.setItem('successCreateSubject', 'تم إضافة الاختبار بنجاح');
                    window.location.href = 'show-subjects.html';
                } else {
                    // Show warning message using iziToast
                    iziToast.warning({
                        title: 'حاول مرة اخري !',
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
                    title: 'الشبكة غير مستقره ',
                    position: 'topRight'
                });
            });
    }
});