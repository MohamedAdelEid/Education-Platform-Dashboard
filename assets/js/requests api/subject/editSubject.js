// Request Put Subject

// Request to update an existing subject
const formEditSubject = document.querySelector('.editSubject');

formEditSubject.addEventListener('submit', event => {
    if (validateForm_2()) {
        event.preventDefault();

        // Collect the form data
        const formData = new FormData(formEditSubject);
        
        // Convert the FormData object to a plain JavaScript object
        const subjectData = Object.fromEntries(formData.entries());

        // Convert string boolean values to actual boolean types
        subjectData.isOnilne = subjectData.isOnilne == 'true' ? true : false ;
        subjectData.isActive = subjectData.isActive == 'true' ? true : false ;
        subjectData.totalPrice = subjectData.totalPrice == "" ? 0 : subjectData.totalPrice; 
        console.log(subjectData.isActive)
        
        // Convert the JavaScript object to a JSON string
        const subjectDataJson = JSON.stringify(subjectData);

        console.log(subjectDataJson);

        // Send the JSON data to the server using fetch
        fetch(`http://edu1.runasp.net/api/subject/${subjectId}`, {
            method: 'PUT',
            body: subjectDataJson,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            // Check if the response status is ok (200-299)
            if (response.ok) {
                // Show success message using iziToast
                localStorage.setItem('successEditSubject', 'تم تحديث المادة بنجاح');
                window.location.href = `view-subject.html?id=${subjectId}`;
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
                title: 'الشبكة غير مستقرة',
                position: 'topRight'
            });
        });
    }
});