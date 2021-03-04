class Place {

  constructor(id, name, description){
    this.id = id;
    this.name = name;
    this.description = description;
    Place.all.push(this)
  }

  static all = []

   renderPlace() {
    let div = document.createElement("div");
    let h4 = document.createElement("h4");
    let p = document.createElement("p");
    let deleteLink = document.createElement("a");
    // let editLink = document.createElement("a");
    let placesDiv = document.getElementById("places");
  
    //edit and delete links go here w/event listeners
    deleteLink.dataset.id = this.id
    deleteLink.setAttribute("href", "#")
    deleteLink.innerText = "Delete"
  
    deleteLink.addEventListener("click", deletePlace)
  
    h4.innerText = this.name;
    p.innerText = this.description;
  
    div.appendChild(h4);
    div.appendChild(p);
    //append edit and delete links here
    div.appendChild(deleteLink);
    placesDiv.appendChild(div);
  }

  static renderPlaces() {
    resetMain();
    placesTemplate();
  
    Place.all.forEach(function (place) {
      place.renderPlace();
    });
  }
}