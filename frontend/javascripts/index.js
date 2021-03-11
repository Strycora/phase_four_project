
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

document.addEventListener("DOMContentLoaded", function () {
  Place.placesTemplate();
  Place.getPlaces();
  formLinkEvent();
  placesLinkEvent();
});