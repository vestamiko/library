const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "172.17.51.91",
  user: "kab212_1",
  password: "mok212_1",
  database: "kab212_1_databasename",
});


module.exports = connection;