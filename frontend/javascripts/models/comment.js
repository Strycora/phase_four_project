class Comment{
  constructor(id, text, place_id){
    this.id = id
    this.text = text
    this.place_id = place_id
  }

  static all = []

  static async getComments(){
    Comment.clearComments();
    const data = await Api.get("/comments")
    data.forEach(c => {
      let comment = new Comment(c.id, c.text, c.place_id);
      comment.renderComment();
    })
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

  save(){
    Comment.all.push(this);
  }

  static async addComment(event){
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
    if (!div.querySelector("INPUT")){
      div.appendChild(commentInput);
      div.appendChild(commentSubmit);
    }
    commentSubmit.addEventListener("click", function(e){
      e.preventDefault();
     
      let text = commentInput.value;
        let comment = {
          text: text,
          place_id: id
        }
      Api.post("/comments", comment)
      .then(comment => {
          let c = new Comment(comment.id, comment.text, comment.place_id)
          let placeDiv = document.getElementById(event.target.dataset.id)
          let p = document.createElement("p")
            p.id = `Comment${c.id}`
            p.innerText = c.text;
          
          placeDiv.appendChild(p);
          c.save();
        })
  })
  }
}