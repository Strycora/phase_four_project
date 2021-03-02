let places = []

const baseUrl = "http://localhost:3000"

function main(){
  return document.getElementById("main");
}

function nameInput(){
  return document.getElementById("name");
}

function descriptionInput(){
  return document.getElementById("description");
}

function resetMain(){
  main().innerHTML = "";
}

function form() {
  return document.getElementById("form");
}

function formLink(){
  return document.getElementById("form-link")
}

function placesLink(){
  return document.getElementById("places-link")
}

async function getPlaces() {

  const resp = await fetch(baseUrl + '/places')
  const data = await resp.json();
  places = data
  renderPlaces();
}

function formTemplate(){
  return `
  <h3>Add a Favorite Place</h3>
  <form id="form">
    <div class="input-field">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" />
    </div>

    <div class="input-field">
      <label for="description">Description</label><br />
      <textarea name="description" id="description" cols="30" rows="10"></textarea>
    </div>
    <input type="submit" value="Add Place" />
  </form>
  `;
}

function placesTemplate(){
  return `
  <h3> My Favorite Places
  <div id="places"></div>
  `
}

function renderPlace(place) {
  let div = document.createElement("div");
  let h4 = document.createElement("h4");
  let p = document.createElement("p");
  // let deleteLink = document.createElement("a");
  // let editLink = document.createElement("a");
  let placesDiv = document.getElementById("places");

  //edit and delete links go here w/event listeners


  h4.innerText = place.name;
  p.innerText = place.description;

  div.appendChild(h4);
  div.appendChild(p);
  //append edit and delete links here
  placesDiv.appendChild(div);
}

function renderPlaces() {
  resetMain();
  main().innerHTML = placesTemplate();

  places.forEach(function (place) {
    renderPlace(place);
  });
}

function submitForm(e) {
  e.preventDefault();

  let strongParams = {
    place: {
      name: nameInput().value,
      description: descriptionInput().value,
    }
  }

  fetch(baseUrl + '/places', {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(strongParams),
    method: "POST"
  })
    .then( function(resp) {
      return resp.json();
    })
    .then( function(place) {
      places.push(place)
      renderPlaces();
    })
}

function renderForm() {
  resetMain();
  main().innerHTML = formTemplate();
  form().addEventListener("submit", submitForm);
}

function formLinkEvent() {
  formLink().addEventListener("click", function (e) {
    e.preventDefault();

    renderForm();
  });
}

function placesLinkEvent(){
  placesLink().addEventListener("click", function(e){
    e.preventDefault

    renderPlaces();
  })
}


document.addEventListener("DOMContentLoaded", function () {
  getPlaces();
  formLinkEvent();
  placesLinkEvent();
});