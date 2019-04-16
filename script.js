window.onload = function () {

    makeTable();
    function makeTable() {
        //reset table
        $("#table tr").remove();

        //ajax
        function successCallback(incomingData) {


            //header 
            $('#table').append("<tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Edit</th><th>Delete</th></tr>");

            //populate
            var id = '';
            for (i = 0; i < incomingData.length; i++) {

                var row = table.insertRow(-1);

                Object.entries(incomingData[i]).forEach(entry => {

                    //Store ID
                    if (entry[0] == 'id') {
                        id = entry[1];
                    }

                    var cell = row.insertCell();
                    cell.innerHTML = entry[1];
                });

                var cell = row.insertCell();
                cell.innerHTML = '<button type="button" data-d="' + id + '" class="btn btn-success editme">Edit</button>';
                var cell = row.insertCell();
                cell.innerHTML = '<button type="button" data-id="' + id + '" class="btn btn-danger deleteme">Delete</button>';

            }

            // make delete/edit buttons clickable
            deletebuttonsOnTable();
            editbuttonsOnTable();

        };


        function errorCallback(request, status, error) {
            // do something with the error
            console.log("fail");
        }

        // perform an ajax http get request
        $.ajax({
            url: 'http://localhost:8080/javabank5/api/customer',
            async: true,
            contentType: 'application/json',
            success: successCallback,
            error: errorCallback
        });

        var table = document.getElementById("table"); //Change Me
    }

    //Delete Customers
    function deletebuttonsOnTable() {
        $(".deleteme").on("click", function () {
            var id = $(this).data("id");
            //alert("u click on user:" + id);

            // perform an ajax http get request
            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:8080/javabank5/api/customer/' + id,
                async: true,
                contentType: 'application/json',
                success: makeTable
            });

        });
    }

    //Edit Customers
    function editbuttonsOnTable() {
        $(".editme").on("click", function () {
            var id = $(this).data("id");
            //alert("u click on user:" + id);
            // perform an ajax http get request
            $.ajax({
                url: 'http://localhost:8080/javabank5/api/customer/' + id,
                async: true,
                contentType: 'application/json',
                success: function successCallbackUser(incomingData) {
                    //populate inputs
                    console.log(incomingData);
                    $("#fname").val(incomingData.firstName);
                    $("#lname").val(incomingData.lastName);
                    $("#phone").val(incomingData.phone);
                    $("#email").val(incomingData.email);
                    $("#id").val(incomingData.id);
                }
            });
        });
    }



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

} //.onload