$(document).ready(function () {




    //anchors
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
    var users = [
        { "firstName": "Admin", "lastName": "Admin", "email": "admin@mail.com", "password": "admin", },
        { "firstName": "Rui", "lastName": "Admin", "email": "Rui@mail.com", "password": "Ru1" },
        { "firstName": "Sara", "lastName": "Admin", "email": "Sara@mail.com", "password": "S4ra" },
        { "firstName": "João", "lastName": "Admin", "email": "Joao@mail.com", "password": "Joao" },
        { "firstName": "Lara", "lastName": "Admin", "email": "Lara@mail.com", "password": "L4ra" },
        { "firstName": "Ramos", "lastName": "Admin", "email": "Ramos@mail.com", "password": "R4mos" }];

    // Variable to count number of attempts.
    var attempt = 3;
    $("#login-submit").on("click", function () {

        var email = document.getElementById("inputEmail").value;
        var password = document.getElementById("inputPassword").value;

        Object.entries(users).forEach(usr => {

            if (email == usr[1].email) {

                if (password == usr[1].password) {
                   
                    //window.location = "index.html"; // Redirecting to other page.
                    $("#exampleModal").modal("hide");
                    $(".username-nav .nav-link").text(email);

                    $("#shopping").show();

                    $(".perfil").html("<h2>" + usr[1].firstName + " " + usr[1].lastName + "</h2><br><h5 class='lightgrey'>" + usr[1].email + "</h5>");

                  
                    return false;
                }

                else {
                    attempt--;// Decrementing by one.
                   
                    // Disabling fields after 3 attempts.
                    if (attempt == 0) {
                        document.getElementById("inputEmail").disabled = true;
                        document.getElementById("inputPassword").disabled = true;
                        document.getElementById("login-submit").disabled = true;
                        return false;
                    }
                }
            }else{

                $("#login-submit").removeClass( "btn-warning" );
                $("#login-submit").addClass( "btn-danger" );
                $(".modal-red").css( 'border-color', "red", "important" );
                

            }

        });
    });

    //logout
    $("#logout").on("click", function () {
        location.reload();
    });

    //Validate form
    /*
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
    */

    //Validate form Register
    validRegister();
    function validRegister() {
        $("#form-register").validate({
            rules: {
                inputFirstNameR: {
                    required: true, minlength: 3

                },
                inputLastNameR: {
                    required: true, minlength: 3
                },
                inputEmailR: {
                    required: true, minlength: 2
                },
                inputPasswordR: {
                    required: true, minlength: 8
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
    //Submit form Register
    $("#register-submit").on("click", function () {

        var mail = document.getElementById("inputEmailR").value;
        var password = document.getElementById("inputPasswordR").value;

        var lastName = document.getElementById("inputLastNameR").value;
        var firstName = document.getElementById("inputFirstNameR").value;

        $('#registerModal').modal('hide');
        users.push({ "firstName": firstName, "lastName": lastName, "email": mail, "password": password });
		console.log(users);

    });


    //This is a btn to open a Register MOdal
    $("#btnRegisterModal").click(function () {
        $("#registerModal").modal("show");
    });

    // Persist new user
    $("#register-submit").on("click", function () {

    

        users.push({
            "name": "" + $('#inputEmail').val(),
            "password": "" + $('#inputPassword').val()
        })
    
        //return users;
    });


    ///////////////////////////////////////////


    listCustomers();
    addCategoryListerner();


    function listCustomers() {
        var url = 'https://api.myjson.com/bins/spxtc';
        $.ajax({
            url: url,
            async: true,
            type: 'GET',
            success: populateCards,
            error: errorCallback
        });
    }


    function populateCards(request) {
        var productCard = $('.card-deck');

        //populate
        for (i = 0; i < request.length; i++) {
         //filter
                        //$(".menuCategory").attr("menuCategory", request[i].category);
                        //cards
                        var btn = '<button type="button" class="btn btn-warning buy-this" data-price="'+request[i].price+'" data-id="' + request[i].id + '" data-url="' + request[i].url + '"  data-name="' + request[i].name + '" >Add to cart</button>';
                        var cardBody = '<div class="col-12 "><h4 class="card-title">' + request[i].name + '</h4><p class="card-type">' + request[i].type + '</p><p class="col-12 col-md-10 nopadding-left" >' + request[i].description + '</p><p>Price: €' + request[i].price + '</p><button type="button" class="btn  btn-light btn-md card-button" data-toggle="modal" data-target="#modalProd" data-id="' + request[i].id + '">More info</button>' + btn + '</div>';
                        $("#card-deck").append('<div class="space col-12 col-sm-6 col-md-4 col-lg-3"><div class="col-12"><img data-target="#modalProd" data-id="' + request[i].id + '" class="cem card-button" src="' + request[i].url + '" alt="Card image cap"><a href="#!"><div class="mask rgba-white-slight"></div></a></div>' + cardBody + '</div>');
                    }
        addModalListerner();
        buyListerner();
    };


    function populateModal(id) {
        var url = 'https://api.myjson.com/bins/spxtc';

        $.ajax({
            url: url,
            async: true,
            type: 'GET',
            success: function (request) {

                $('#modalProd').modal('show');

                //populate
                for (i = 0; i < request.length; i++) {

                    if (id == request[i].id) {

                        //Modal
                        $("#rcard-title").html(request[i].name);
                        $("#rcard-img-top").attr("src", request[i].url);
                        $("#rcard-text").html(request[i].description);
                        $("#rcard-category").html(request[i].category + ' ' + request[i].type);
                        $("#rcard-price").html('Price: €' + request[i].price);
                        //data( "foo", 52 );
                        $(".rbuy-this").data("price",request[i].price);
                        $(".rbuy-this").data("id",request[i].id);
                        $(".rbuy-this").data("name",request[i].name);
                        $(".rbuy-this").data("url",request[i].url);  
                     
                    }
                }

                
            },
            error: errorCallback
        });
    };

    function errorCallback(request, status, error) {
        console.log(request);
        console.log(status);
        console.log(error);
        console.log('Callback Error!! Good luck to find me BWAHAHAHAH');
    }

    function addModalListerner() {
        $('.card-button').click(function (event) {
            var id = $(this).data("id");
            populateModal(id);
        });
    }

    function addCategoryListerner() {
        $('.menuCategory').click(function (event) {
            var category = $(this).data("link");
            filterProducts(category);
        });
    }

    function filterProducts(category) {

        $('#card-deck').html('');

        var url = 'https://api.myjson.com/bins/spxtc';
        $.ajax({
            url: url,
            async: true,
            type: 'GET',
            success: function (request) {

                //populate
                for (i = 0; i < request.length; i++) {



                    if (category != "index") {
                        if (category == request[i].category) {


                            //filter
                            //$(".menuCategory").attr("menuCategory", request[i].category);
                            //cards
                            var btn = '<button type="button" class="btn btn-warning buy-this" data-price="'+request[i].price+'" data-id="' + request[i].id + '" data-url="' + request[i].url + '"  data-name="' + request[i].name + '" >Add to cart</button>';
                            var cardBody = '<div class="col-12"><h4 class="card-title">' + request[i].name + '</h4><p class="card-type">' + request[i].type + '</p><p class="col-12 col-md-10 nopadding-left" >' + request[i].description + '</p><p>Price: €' + request[i].price + '</p><button type="button" class="btn  btn-light btn-md card-button" data-toggle="modal" data-target="#modalProd" data-id="' + request[i].id + '">More info</button>' + btn + '</div>';
                            $("#card-deck").append('<div class="space col-12 col-sm-6 col-md-4 col-lg-3"><div class="col-12"><img data-target="#modalProd" data-id="' + request[i].id + '" class="cem card-button" src="' + request[i].url + '" alt="Card image cap"><a href="#!"><div class="mask rgba-white-slight"></div></a></div>' + cardBody + '</div>');


                        }
                    } else {
                        //filter
                        //$(".menuCategory").attr("menuCategory", request[i].category);
                        //cards
                        var btn = '<button type="button" class="btn btn-warning buy-this" data-price="'+request[i].price+'" data-id="' + request[i].id + '" data-url="' + request[i].url + '"  data-name="' + request[i].name + '" >Add to cart</button>';
                        var cardBody = '<div class="col-12 "><h4 class="card-title">' + request[i].name + '</h4><p class="card-type">' + request[i].type + '</p><p class="col-12 col-md-10 nopadding-left" >' + request[i].description + '</p><p>Price: €' + request[i].price + '</p><button type="button" class="btn  btn-light btn-md card-button" data-toggle="modal" data-target="#modalProd" data-id="' + request[i].id + '">More info</button>' + btn + '</div>';
                        $("#card-deck").append('<div class="space col-12 col-sm-6 col-md-4 col-lg-3"><div class="col-12"><img data-target="#modalProd" data-id="' + request[i].id + '" class="cem card-button" src="' + request[i].url + '" alt="Card image cap"><a href="#!"><div class="mask rgba-white-slight"></div></a></div>' + cardBody + '</div>');
                    }
                } addModalListerner();
                buyListerner()
            },
            error: errorCallback
        });

    }

    var products = [];

    function buyListerner() {
        $('.buy-this').click(function (event) {


            var id = $(this).data("id");
            var url = $(this).data("url");
            var name = $(this).data("name");
            
           
            //var category =    $(this).data("category");
            //var type =        $(this).data("type");
            //var description = $(this).data("description");
            var price = $(this).data("price");

            // users.push( {  "firstName": firstName,"lastName": lastName, "email": mail,     "password": password } );
            products.push({ "id": id, "url": url, "name": name, "price": price })

            var win = new Audio('sound/audio.wav');
            win.play();
            

        });
    }

    //show cart
    cartListerner(products);
    function cartListerner(products) {
        $('#shopping').click(function (event) {

           
            //delete
            $(".cart-table").html("");

            //populate
            $(".cart-price").html('');
            var price=0;

            for (i = 0; i < products.length; i++) {

                price += products[i].price;
            
                $(".cart-table").append("<tr> <td><small>ID: </small> "+products[i].id+"</td> <td class='text-center'><img class='img-cart' src='"+products[i].url+"'></td>       <td><small>Name: </small>"+products[i].name+"</td>  <td>Price</td><td>"+products[i].price+" €</td> </tr>");
            
            }
  
            $(".cart-price").html("Total: " + price + "€");
            

        });
    }



    //
    // $(".username-nav").attr("data-target", "#")

    //$("#shopping").show();


    //


});


