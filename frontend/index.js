let places = []

const baseUrl = "http://localhost:3000"

function main(){
  return document.getElementById("main");
}

function resetMain(){
  main().innerHTML = "";
}

function formLink(){
  return document.getElementById("form-link")
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