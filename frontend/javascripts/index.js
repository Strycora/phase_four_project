

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

function placesList(){
  return document.getElementById("places");
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
  data.forEach(p => {
    let pl = new Place(p.id, p.name, p.description)
    pl.renderPlace();
  }) 
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

function addComment(event){
  let div = event.target.parentElement
  let id = event.target.dataset.id
  div.innerHTML += `
  <form id="form">
    <div class="input-field">
      <label for="comment">Comment</label>
      <input type="text" name="comment" id="comment" />
    </div>
    <input type="submit" id=commentSubmit value="Add Comment" />
  </form>
  ` 
  let commentElement = document.getElementById("comment");
  let commentSubmit = document.getElementById("commentSubmit");
  commentSubmit.addEventListener("click", function(e){
    e.preventDefault();
   
    let text = commentElement.value;
      let comment = {
        text: text,
        place_id: id
      }
      fetch(`${baseUrl}/comments`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(comment)
    })
    .then(resp => resp.json())
    .then(comment => {
        let c = new Comment(comment.id, comment.text, comment.place_id)
        let placeDiv = document.getElementById(event.target.dataset.id)
        let p = document.createElement("p")
        p.innerText = c.text
        placeDiv.appendChild(p)

      })
})
}



function placesTemplate(){
  main().innerHTML += `
  <h3> My Favorite Places </h3>
  <div id="places"></div>
  `
}

function deletePlace(e){
  e.preventDefault();

  let id = e.target.dataset.id

  fetch(baseUrl + '/places/' + id, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "DELETE"
  })
    .then( function(resp) {
      return resp.json();
    })
    .then( function(data){
      let result; 
      for (let i = 0 ; i < Place.all.length; i++){
        if (Place.all[i].name === data.name){
           result = Place.all.splice(i, 1)
           
          }
        }
    placesList().innerHTML = "";
    Place.all.forEach(p => {
          p.renderPlace();
        })
    })
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
      let pl = new Place(place.id, place.name, place.description)
      pl.renderPlace();
    })
}

function renderForm() {
  resetMain();
  placesTemplate();
  main().innerHTML += formTemplate();
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

    Place.renderPlaces();
  })
}

document.addEventListener("DOMContentLoaded", function () {
  placesTemplate();
  getPlaces();
  formLinkEvent();
  placesLinkEvent();
});