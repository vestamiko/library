const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const connection = require("./db.js");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connection.connect((err) => {
  if (err) {
    throw new Error("Could not connect to database" + err.message);
  } else {
    console.log("prisijungta prie DB");
  }
});

//////////
/// POST / books
// insert into table_name (column1, column2...)
/// values (value1, value2...)

// app.post("/books", (req, res) => {
// let sql = `INSERT INTO library
// (title, author, genre)
// VALUES (
// '${req.body.title}',
// '${req.body.author}',
// '${req.body.genre}'
// );
// `;        //// variantas galimas bet nera saugus

app.post("/books", (req, res) => {
  let booksData = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
  };

  let sql = `INSERT INTO library
    (title, author, genre)
    VALUES (
    ?, ?, ?
    );
    `;

  connection.query(
    sql,
    [req.body.title, req.body.author, req.body.genre],
    (err, result) => {
      if (err) {
        console.log("Error inserting data", err);
        return res
          .status(500)
          .json({ message: "error inserting data", error: err.message });
      }

      res.json({ message: "record created successfully", booksData });
    }
  );
});

/// get /books/all
/// SELECT * FROM table_name;

app.get("/books/all", (req, res) => {
  let sql = `SELECT * FROM library`;

  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

///////// get one /books/:id
/// SELECT column1, column2...
/// FROM table_name
/// WHERE condition;

app.get("/books/:id", (req, res) => {
  let sql = `
    SELECT *
    FROM library
    WHERE id = ?;`;

  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log("Error inserting data", err);
      return res
        .status(500)
        .json({ message: "error inserting data", error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(result[0]);
  });
});

///////// delete /books/:id
/// DELETE FROM table_name
/// WHERE condition;

app.delete("/books/:id", (req, res) => {
  let sql = `DELETE FROM library
    WHERE id = ?;`;

  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log("Error inserting data", err);
      return res
        .status(500)
        .json({ message: "error inserting data", error: err.message });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "record deleted successfully" });
    } else {
      res.status(404).json({ message: "record not found" });
    }
  });
});

///////// put /books/:id
/// UPDATE table_name
/// SET column1 = value1, column2 = value2...
/// WHERE condition;

app.put("/books/:id", (req, res) => {
  let sql = `UPDATE library
    SET title = ?, author = ?, genre = ?
    WHERE id = ?;`;

  connection.query(
    sql,
    [req.body.title, req.body.author, req.body.genre, req.params.id],
    (err, result) => {
        
      const getFromDB = `SELECT * FROM library WHERE id = ?;`;

      connection.query(getFromDB, [req.params.id], (err, updatedResult) => {
        res.json({
          message: "record updated successfully",
          updated: updatedResult[0],
        });
      });
    }
  );
});

//////////

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
