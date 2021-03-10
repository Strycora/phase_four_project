
function resetMain(){
  main().innerHTML = "";
}

async function getPlaces() {

  const resp = await fetch(baseUrl + '/places')
  const data = await resp.json();
  data.forEach(p => {
    let pl = new Place(p.id, p.name, p.description)
    pl.renderPlace();
  }) 
  getComments();
}

async function getComments(){
  Comment.clearComments();
  const resp = await fetch(baseUrl + '/comments')
  const data = await resp.json();
  data.forEach(c => {
    let comment = new Comment(c.id, c.text, c.place_id);
    comment.renderComment();
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

  let commentInput = document.createElement("INPUT")
    commentInput.type = 'TEXT';
    commentInput.name = 'comment';
    commentInput.id = 'commentInput';
    commentInput.type = 'TEXT';
    commentInput.placeholder = "comment";
  const commentSubmit = document.createElement("button")
    commentSubmit.id = "commentSubmit";
    commentSubmit.innerHTML = "Add Comment"

  div.appendChild(commentInput);
  div.appendChild(commentSubmit);

  commentSubmit.addEventListener("click", function(e){
    e.preventDefault();
   
    let text = commentInput.value;
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
          p.id = `Comment${c.id}`
        let deleteButton = document.createElement("button");
          deleteButton.id = "deleteButton";
          deleteButton.innerHTML = "Delete Comment";
          deleteButton.addEventListener("click", deleteComment)

        p.innerText = c.text;
        placeDiv.appendChild(p);
        placeDiv.appendChild(deleteButton);
        c.save();
      })
})
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
  Place.placesTemplate();
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
  Place.placesTemplate();
  getPlaces();
  formLinkEvent();
  placesLinkEvent();
});