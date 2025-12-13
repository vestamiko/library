const bookForm = document.getElementById("bookForm");
const bookTitleInput = document.querySelector("#bookTitleInput"); // query selector: turiu nurodyt groteles
const bookAuthorInput = document.getElementById("bookAuthorInput");
const bookGenreInput = document.getElementById("bookGenreInput");
const createBooks = document.getElementById("createBooks");
const updateBooks = document.getElementById("updateBooks");
const tableBody = document.getElementById("tableBody");

// const bookIdInput = document.getElementById("bookIdInput");

 // let bookId = 1; // test id, galima pakeist i input value

 //// POST
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
fetchDataFromDB();
    });
});

///// UPDATE BOOK
updateBooks.addEventListener("click", () => {
    if (!editId) {
        alert("Pirma pasirink knyga readagavimui");
       return;
    }
  const updatedBookData = {
    title: bookTitleInput.value,
    author: bookAuthorInput.value,
    genre: bookGenreInput.value,
  };

  fetch(`http://localhost:8000/books/${editId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBookData),
  })
    .then((resp) => resp.json())
    .then(() => {
      bookForm.reset();
      editId = null;
      editMode = false;
      fetchDataFromDB();
    });
});

///// POST
let editMode = false;
let editId = null;

// bookForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const booksData = {
//     title: bookTitleInput.value,
//     author: bookAuthorInput.value,
//     genre: bookGenreInput.value,
//   };

//   let url = "http://localhost:8000/books";
//   let method = "POST";

//   if (editMode && editId) {
//     url = `http://localhost:8000/books/${editId}`;
//     method = "PUT";
//   }

//   fetch(url, {
//     method: method,
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify(booksData),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       form.reset();
//       bookTitleInput.value = "";
//       bookAuthorInput.value = "";
//       bookGenreInput.value = "";

//       editMode = false;
//       editId = null;

//       createBooks.textContent = "Create Book";

//       fetchDataFromDB();
//     });
// });

// ///// CREATE BOOK
// createBooks.addEventListener("click", () => {
//   const bookData = {
//     title: bookTitleInput.value,
//     author: bookAuthorInput.value,
//     genre: bookGenreInput.value,
//   };

//   fetch("http://localhost:8000/books", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(bookData),
//   })
//     .then((resp) => resp.json())
//     .then((data) => {
//       console.log(data);
//       bookForm.reset();
//     });
// });

///// GET ALL BOOKS
// getAllRecords.addEventListener("click", () => {
//   fetch("http://localhost:8000/books", {
//     method: "GET",
//   })
//     .then((resp) => resp.json())
//     .then((data) => {
//       console.log(data);
//       bookForm.reset();
//     });
// });
function fetchDataFromDB() {
  fetch("http://localhost:8000/books/all")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // fetchDataFromDB();

      const tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";

      if (data.length === 0) {
        const message = document.getElementById("message");
        if (message) message.textContent = "no data found";
        return;
      }

      data.forEach((el, i) => {
        console.log(el);

        const tableRow = document.createElement("tr");
        tableRow.id = `row-${el.id}`;

        const tdNr = document.createElement("td");
        tdNr.textContent = i + 1;

        const tdTitle = document.createElement("td");
        tdTitle.textContent = el.title;

        const tdAuthor = document.createElement("td");
        tdAuthor.textContent = el.author;

        const tdGenre = document.createElement("td");
        tdGenre.textContent = el.genre;

        const tdActions = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "EDIT";
        editBtn.classList.add("edit");
        editBtn.setAttribute("data-id", el.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";
        deleteBtn.classList.add("delete");
        deleteBtn.setAttribute("data-id", el.id);

        editBtn.addEventListener("click", () => {
          editBooks(el.id);
        });

        deleteBtn.addEventListener("click", () => {
          deleteBooks(el.id);
        });

        tdActions.append(editBtn, deleteBtn);
        tableRow.append(tdNr, tdTitle, tdAuthor, tdGenre, tdActions);
        tableBody.append(tableRow);
      });
    });
}

///// GET ONE BOOK
// getOneRecord.addEventListener("click", () => {
//   fetch(`http://localhost:8000/books/${bookId}`, {
//     method: "GET",
//   })
//     .then((resp) => resp.json())
//     .then((data) => {
//       console.log(data);
//       bookForm.reset();
//     });
// });

///// edit BOOK
function editBooks(id) {
  fetch(`http://localhost:8000/books/${id}`)
    .then((res) => res.json())
    .then((books) => {
      editMode = true;
      editId = id;

      bookTitleInput.value = books.title;
      bookAuthorInput.value = books.author;
      bookGenreInput.value = books.genre;

      // createBooks.textContent = "UPDATE";
    });
}

// ///// DELETE BOOK
function deleteBooks(id) {
  fetch(`http://localhost:8000/books/${id}`, {
    method: "DELETE",
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      fetchDataFromDB();
    });
}
fetchDataFromDB();

