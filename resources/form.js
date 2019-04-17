window.onload = function () {

    //Form Customer Managements
    resetForm();
    editForm();
    addForm();

    function addForm() {
        $(".addCustomer").on("click", function () {

            // Send the data using post
            var myDataVar = JSON.stringify({
                firstName: $('#fname').val(),
                lastName: $('#lname').val(),
                email: $('#email').val(),
                phone: $('#phone').val()
            });

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/javabank5/api/customer',
                async: true,
                data: myDataVar,
                contentType: 'application/json',
                success: makeTable,
            });

        });
    }

    function editForm() {
        $(".editCustomer").on("click", function () {
            // Send the data using post
            var myDataVar = JSON.stringify({
                firstName: $('#fname').val(),
                lastName: $('#lname').val(),
                email: $('#email').val(),
                phone: $('#phone').val()
            });
            alert("EDIT" + myDataVar);

            $.ajax({
                type: 'PUT',
                url: 'http://localhost:8080/javabank5/api/customer/' + $('#id').val(),
                async: true,
                data: myDataVar,
                contentType: 'application/json',
                success: makeTable
            });
        });
    }

    function resetForm() {
        $(".resetme").on("click", function () {
            //alert("RESET");
            $('form').get(0).reset();
        });
    }
}