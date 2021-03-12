class Place {

  constructor(attr){
    this.id = attr.id;
    this.name = attr.name;
    this.description = attr.description;
    this.ImageUrl = attr.ImageUrl;

  }

  static all = []

  save(){
    Place.all.push(this);
  }

  static createFromCollection(collection){
    collection.forEach(data => Place.create(data))
  }

  static create(attr){
    let place = new Place(attr);
    place.save();
    return place;
  }



   renderPlace() {
    let div = document.createElement("div");
    let h4 = document.createElement("h4");
    let p = document.createElement("p");
    let img = document.createElement("img");
      img.src = this.ImageUrl;
      img.height = 200
      img.width = 200
    let deleteLink = document.createElement("a");
    let commentBtn = document.createElement("button");
    let placesDiv = document.getElementById("places");

    commentBtn.dataset.id = this.id
    commentBtn.innerText = "Comment"
    commentBtn.addEventListener("click", Comment.addComment)

    deleteLink.dataset.id = this.id
    deleteLink.setAttribute("href", "#")
    deleteLink.innerText = "Delete"
    deleteLink.addEventListener("click", Place.deletePlace)
  
    h4.innerText = this.name;
    p.innerText = this.description;

    div.setAttribute("id", this.id)
  
    div.appendChild(h4);
    div.appendChild(p);
    if (this.ImageUrl != ""){
    div.appendChild(img);
    }
    div.appendChild(document.createElement("br"))
    div.appendChild(deleteLink);
    div.appendChild(commentBtn);
    placesDiv.appendChild(div);
  }

  //Templates

  static placesTemplate(){
    main().innerHTML += `
    <h3> My Favorite Places </h3>
    <div id="places"></div>
    `
  }

  static formTemplate(){
    return `
    <h3>Add a Favorite Place</h3>
    <form id="form">
      <div class="input-field">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" required/>
      </div>
  
      <div class="input-field">
        <label for="description">Description</label><br />
        <textarea name="description" id="description" cols="30" rows="10" required></textarea>
      </div>

      <div class="input-field">
        <label for="imageUrl">Image</label>
        <input type="text" name="imageUrl" id="imageUrl" />
      </div><br>

      <input type="submit" value="Add Place" />
    </form>
    `;
  }

  //Renders

  static renderForm() {
    resetMain();
    Place.placesTemplate();
    main().innerHTML += Place.formTemplate();
    form().addEventListener("submit", Place.submitForm);
  }

  static renderPlaces() {
    resetMain();
    Place.placesTemplate();
  
    Place.all.forEach(function (place) {
      place.renderPlace();
    });
    Comment.getComments();
  }

  static submitForm(e) {
    e.preventDefault();
  
    let strongParams = {
      place: {
        name: nameInput().value,
        description: descriptionInput().value,
        ImageUrl: imageUrlInput().value
      }
    }
    Api.post('/places', strongParams)
      .then( function(data) {
        Place.create(data);
        Place.renderPlaces();
      })
  }

  static async getPlaces() {

    const data = await Api.get("/places");
    Place.createFromCollection(data);
    Place.renderPlaces()

  }

  static async deletePlace(e){
    e.preventDefault();
  
    let id = e.target.dataset.id
  
    const data = await Api.delete("/places/" + id)
      .then(function(data){
        let result; 
        for (let i = 0 ; i < Place.all.length; i++){
          if (Place.all[i].name === data.name){
             result = Place.all.splice(i, 1)
             
            }
          }
      placesList().innerHTML = "";
      Place.renderPlaces();
      })
  }

}