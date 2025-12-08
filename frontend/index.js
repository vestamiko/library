const bookForm = document.getElementById("bookForm");
const bookTitleInput = document.querySelector("#bookTitleInput"); // query selector: turiu nurodyt groteles
const bookAuthorInput = document.getElementById("bookAuthorInput");
const bookGenreInput = document.getElementById("bookGenreInput");
const createRecord = document.getElementById("createRecord");
const updateRecord = document.getElementById("updateRecord");


bookForm.addEventListener("submit", (event) => {
event.preventDefault();
const bookData = {
    title: bookTitleInput.value,
    author: bookAuthorInput.value,
    genre: bookGenreInput.value,
  };

  fetch("http://localhost:8000/books", {
    method: "POST", 
    headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify(bookData),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      bookForm.reset();
    });
});