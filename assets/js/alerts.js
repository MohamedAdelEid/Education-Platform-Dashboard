document.addEventListener('DOMContentLoaded', function () {
    const deleteSubject = document.querySelectorAll('#deleteSubject');

    deleteSubject.forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            });

            swalWithBootstrapButtons.fire({
                title: 'هل انت متاكد ؟',
                text: "لن تتمكن من التراجع عن هذا!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم، احذفه',
                cancelButtonText: 'لا , تراجع',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                        'تم الحذف',
                        'لقد تم حذف المادة الخاصة بك.',
                        'success'
                    ).then(() => {
                        form
                            .submit(); // Submit the form after the confirmation
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'تم الإلغاء',
                        'لم يتم خذف المادة',
                        'error'
                    );
                }
            });
        });
    });
});
