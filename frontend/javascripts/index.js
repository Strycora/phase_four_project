
function resetMain(){
  main().innerHTML = "";
}

function formLinkEvent() {
  formLink().addEventListener("click", function (e) {
    e.preventDefault();

    Place.renderForm();
  });
}

function placesLinkEvent(){
  placesLink().addEventListener("click", function(e){
    e.preventDefault

    Place.renderPlaces();
  })
}

function sortAlphabetically(){
  sortLink().addEventListener("click", function(e){
    e.preventDefault();


    Place.renderAlphabetically();
  })
}

document.addEventListener("DOMContentLoaded", function () {
  Place.placesTemplate();
  Place.getPlaces();
  formLinkEvent();
  placesLinkEvent();
  sortAlphabetically();

});