$(document).ready(function () {
  listCustomers();
  
});

function listCustomers() {
  var url = 'https://api.myjson.com/bins/msnko';
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

 

      //cards
      var cardBody ='<div class="col-12 "><h4 class="card-title">'+request[i].name+'</h4><p class="card-type">'+request[i].type+'</p><p class="card-text">'+request[i].description+'</p><button type="button" class="btn btn-light-blue btn-md card-button" data-toggle="modal" data-target="#modalProd" data-id="'+request[i].id+'">More info</button></div>';
      $("#card-deck").append('<div class="space col-12 col-sm-6 col-md-4 col-lg-3"><div class="view overlay "><img class="cem" src="'+request[i].url+'" alt="Card image cap"><a href="#!"><div class="mask rgba-white-slight"></div></a></div>'+cardBody+'</div>');
  }

  addModalListerner();
};


function populateModal(id) {

  var url = 'https://api.myjson.com/bins/msnko';
  $.ajax({
    url: url,
    async: true,
    type: 'GET',
    success: function(request){

    
      $('#modalProd').modal('show');

      //populate
      for (i = 0; i < request.length; i++) {
    
        if(id == request[i].id){

          //Modal
          $("#rcard-title").html(request[i].name);
          $("#rcard-img-top").attr("src",request[i].url);
          $("#rcard-text").html(request[i].description);
          $("#rcard-category").html(request[i].category + ' ' + request[i].type);
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
    var id = $( this ).data( "id" );
    populateModal(id);
  });
}

