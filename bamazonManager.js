var mysql = require("mysql");
var inquirer = require("inquirer");
var allRows;
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Merosathi18?",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT * FROM customers table";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });