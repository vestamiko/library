const db = require("./db.js");

/* ===========================
   CREATE
   POST /books
=========================== */
const createBooks = async (req, res) => {
  try {
    const { title, author, genre } = req.body;

    if (!title || !author || !genre) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO books (title, author, genre) VALUES (?, ?, ?)";
    db.query(sql, [title, author, genre], (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.status(200).json({
        message: "Book created",
        insertedId: result.insertId,
      });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/* ===========================
   GET ALL
   GET /books
=========================== */
const getAllBooks = (req, res) => {
  const sql = "SELECT * FROM books";

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    res.status(200).json(rows);
  });
};

/* ===========================
   GET ONE
   GET /books/:id
=========================== */
const findOneLibrary = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM books WHERE id = ?";
  db.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    if (rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(rows[0]);
  });
};

/* ===========================
   UPDATE
   PUT /books/:id
=========================== */
const updateOneBooks = (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "UPDATE books SET title = ?, author = ?, genre = ? WHERE id = ?";

  db.query(sql, [title, author, genre, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated" });
  });
};

/* ===========================
   DELETE
   DELETE /books/:id
=========================== */
const deleteOneBooks = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM books WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted" });
  });
};

module.exports = {
  createBooks,
  getAllBooks,
  findOneLibrary,
  updateOneBooks,
  deleteOneBooks,
};

// const library = require("./libraryModel.js");
// console.log(books);

// // create books
// // POST /books
// const createBooks = async (req, res) => {
//   try {
//     const { title, author, genre } = req.body;

//     if (!title || !author || !genre) {
//       return res.status(400).json({ err: "All fields must be filled" });
//     }
//     const result = await library.create({ title, author, genre });
//     res.status(200).json({ message: "Book created", data: result });
//   } catch (err) {
//     console.error("error happened while record was created", err);
//     res.status(500).json({ error: "internal server error happened" });
//   }
// };

// /// READ
// // GET all /books/all
// const getAllBooks = async (req, res) => {
//     try {
//         console.log("test")
//     const books = await books.find();

//     if (!books) {
//       return res.status(400).json({ message: "no book found" });
//     }
//     res.status(200).json(library);
//   } catch (err) {
//     console.error("error happened while record was created", err);
//     res.status(500).json({ error: "internal server error happened" });
//   }
//  };

// // READ
// // GET one /books/:id
// const findOneLibrary = async (req, res) => {
//   try {
//     const { idCode } = req.params;

//     if (!idCode) {
//       return res.status(400).json({ message: "no id found" });
//     }
//     const books = await library.findById(idCode);

//     if (!books) {
//       return res.status(400).json({ message: "no book found" });
//     }
//     res.status(200).json(books);
//   } catch (err) {
//     console.error("error happened while record was created", err);
//     res.status(500).json({ error: "internal server error happened" });
//   }
// };

// // UPADTE
// // PUT /books/:idCode

// const updateOneBooks = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (
//       !req.body.title ||
//       !req.body.author ||
//       !req.body.genre
//     ) {
//       return res.status(400).json({ err: "All fields must be filled" });
//     }

//     const getBooks = await library.findById(id);
//     if (!getBooks) {
//       return res.status(400).json({ message: "no book found" });
//     }

//     getBooks.title = req.body.title;
//     getBooks.author = req.body.author;
//     getBooks.genre = req.body.genre;

//     const result = await getBooks.save();

//     res.status(200).json(result);
//   } catch (err) {
//     console.error("error happened while record was created", err);
//     res.status(500).json({ error: "internal server error happened" });
//   }
// };

// /// DELETE
// /// DELETE /shoppingList/:idCode
// const deleteOneBooks = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await books.findByIdAndDelete(id);

//     if (!result) {
//       return res.status(400).json({ err: "Book not found" });
//     }
//     res.status(200).json(result);
//   } catch (err) {
//     console.error("error happened while record was created", err);
//     res.status(500).json({ error: "internal server error happened" });
//   }
// };

// module.exports = {
//   createBooks,
//   getAllBooks,
//   updateOneBooks,
//   deleteOneBooks,
//   findOneLibrary,
// };
