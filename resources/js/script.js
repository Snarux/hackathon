$(document).ready(function () {

    // Below function Executes on click of login button.
    var users = [{ "name": "admin", "password":"admin"}, { "name": "Rui@mail.com", "password": "Ru1" }, { "name": "Sara@mail.com", "password": "S4ra" }, { "name": "Joao@mail.com", "password": "JoÃ£o" }, { "name": "Lara@mail.com", "password": "L4ra" }, { "name": "Ramos@mail.com", "password": "R4mos" }];
    var attempt = 3; // Variable to count number of attempts.
    $("#submit").on("click", function () {
        var username = document.getElementById("inputEmail").value;
        var password = document.getElementById("inputPassword").value;

        Object.entries(users).forEach(usr => {

            if(username == usr[1].name){

                if (password == usr[1].password) {
                    alert("Login successfully");
                    window.location = "success.html"; // Redirecting to other page.
                    return false;
                }
                
                else {
                    attempt--;// Decrementing by one.
                    alert("You have left " + attempt + " attempt;");
                    // Disabling fields after 3 attempts.
                    if (attempt == 0) {
                        document.getElementById("inputEmail").disabled = true;
                        document.getElementById("inputPassword").disabled = true;
                        document.getElementById("submit").disabled = true;
                        return false;
                    }
                }

            }
        });
    }

    );

    //Validate form
    valid();
    function valid() {
        $("#form-signin").validate({
            rules: {
                name: {
                    minlength: 2,
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            highlight: function (element) {
                $(element).closest(".control-group").removeClass("success").addClass("error");
            },
            success: function (element) {
                element.text("OK!").addClass("valid")
                    .closest(".control-group").removeClass("error").addClass("success");
            }
        });
    };
    
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
});

    /*var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true
    });
    $('.play').on('click', function () {
        owl.trigger('play.owl.autoplay', [1000])
    })
    $('.stop').on('click', function () {
        owl.trigger('stop.owl.autoplay')
    })
  $(".owl-carousel").owlCarousel(); // initialize OWL*/
    /*

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
*/
 //.onload