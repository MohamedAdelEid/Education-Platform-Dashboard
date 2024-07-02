function deleteQuiz(quizId) {
    const confirmDelete = confirm('هل انت متاكد من حذف الكويز');
    if (confirmDelete) {
        fetch(`http://edu1.runasp.net/api/quiz/${quizId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('successDeleteQuiz', 'تم حذف الكويز بنجاح');
                // Reload the page after successful deletion
                window.location.reload();
            } else {
                // Show warning message using iziToast
                iziToast.warning({
                    title: 'Failed to Delete Subject. Try Again!',
                    position: 'topRight'
                });
            }
        })
        .catch(error => {
            // Handle network errors
            console.error('Error:', error);
            // Show error message using iziToast
            iziToast.error({
                title: 'Network Error. Please Try Again Later',
                position: 'topRight'
            });
        });
    }
}
