class Comment{
  constructor(id, text, place_id){
    this.id = id
    this.text = text
    this.place_id = place_id
  }

  static all = []

  save(){
    Comment.all.push(this);
  }

  static clearComments(){
    Comment.all = []
  }

   renderComment(){
    let div = document.getElementById(this.place_id)
    let p = document.createElement("p");
      p.id = `Comment${this.id}`
  
    div.appendChild(p);
  
    p.innerText = this.text
  }
}