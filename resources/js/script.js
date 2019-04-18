$(document).ready(function () {

    function scrollToAnchor(aid) {
        var aTag = $("#" + aid);
        $('html,body').animate({ scrollTop: aTag.offset().top }, 'slow');
    }

    //anchor STORE

    $("#astore").click(function () {
        scrollToAnchor('store');
    });

    //anchor LOGO
    $("#logo").click(function () {
        scrollToAnchor('top');
    });

    // Below function Executes on click of login button.
    var users = [{ "name": "admin", "password": "admin" }, { "name": "Rui@mail.com", "password": "Ru1" }, { "name": "Sara@mail.com", "password": "S4ra" }, { "name": "Joao@mail.com", "password": "Joao" }, { "name": "Lara@mail.com", "password": "L4ra" }, { "name": "Ramos@mail.com", "password": "R4mos" }];
    var attempt = 3; // Variable to count number of attempts.
    $("#login-submit").on("click", function () {
        var username = document.getElementById("inputEmail").value;
        var password = document.getElementById("inputPassword").value;

        Object.entries(users).forEach(usr => {

            if (username == usr[1].name) {

                if (password == usr[1].password) {
                    alert("Login successfully");
                    //window.location = "index.html"; // Redirecting to other page.
                    $("#exampleModal").modal("hide");
                    $(".username-nav .nav-link").text(username);
                    $("#shopping").show();
                    $(".alert").show();
                    $(".alert-text").text("Welcome: " + username);
                    return false;
                }

                else {
                    attempt--;// Decrementing by one.
                    alert("You have left " + attempt + " attempt;");
                    // Disabling fields after 3 attempts.
                    if (attempt == 0) {
                        document.getElementById("inputEmail").disabled = true;
                        document.getElementById("inputPassword").disabled = true;
                        document.getElementById("login-submit").disabled = true;
                        return false;
                    }
                }
            }
        });
    });

    //Validate form
    valid();
    function valid() {
        $("#form-signin").validate({
            rules: {
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

    //This is a btn to open a Register MOdal
    $("#btnRegisterModal").click(function () {
        $("#registerModal").modal("show");
    });

    // Persist new user
    $("#register-submit").on("click", function () {
        
        console.log($('#inputEmail').val());
        console.log($('#inputPassword').val());

        users.push({
            "name": "" + $('#inputEmail').val(),
            "password": "" + $('#inputPassword').val() })
        console.log(users);
        //return users;
    });
});

/*
    makeTable();
    function makeTable() {
        //reset table
        $("#products .card").remove();

        //ajax
        function successCallback(incomingData) {

            //populate
            for (i = 0; i < incomingData.length; i++) {

                Object.entries(incomingData[i]).forEach(entry => {
                    $('#products').append('<div class="card"><p class="card-toy-category">Category</p><img class="img-fluid card-img-top" src="" alt="Card image cap"><div class="card-body"><p class="card-toy-name">Name</p><p class="card-toy-type">Type</p></div></div>');
                });
            }
        };
    };

    function errorCallback(request, status, error) {
        // do something with the error
        console.log("something wrong");
    }

    // perform an ajax http get request
    $.ajax({
        url: 'products',
        async: true,
        contentType: 'application/json',
        success: successCallback,
        error: errorCallback
    });




    var owl = $('.owl-carousel');
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
    $(".owl-carousel").owlCarousel(); // initialize OWL 

});


   

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