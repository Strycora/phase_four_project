class Place {

  constructor(attr){
    this.id = attr.id;
    this.name = attr.name;
    this.description = attr.description;
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

  static renderPlaces() {
    resetMain();
    placesTemplate();
  
    Place.all.forEach(function (place) {
      place.renderPlace();
    });
    getComments();
  }

   renderPlace() {
    let div = document.createElement("div");
    let h4 = document.createElement("h4");
    let p = document.createElement("p");
    let deleteLink = document.createElement("a");
    let commentBtn = document.createElement("button");
    let placesDiv = document.getElementById("places");

    commentBtn.dataset.id = this.id
    commentBtn.innerText = "Comment"
    commentBtn.addEventListener("click", addComment)

    deleteLink.dataset.id = this.id
    deleteLink.setAttribute("href", "#")
    deleteLink.innerText = "Delete"
    deleteLink.addEventListener("click", deletePlace)
  
    h4.innerText = this.name;
    p.innerText = this.description;

    div.setAttribute("id", this.id)
  
    div.appendChild(h4);
    div.appendChild(p);
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

  

}