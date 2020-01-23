const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");

var app = express();
app.use(bodyparser.json());
PORT = 5000;

var mysqlConnection = mysql.createConnection({
  host: "mysql-aws-db.c2cbb3erream.us-east-2.rds.amazonaws.com",
  port: "3306",
  user: "root",
  password: "Balraj30",
  database: "EmployeeDB"
});

mysqlConnection.connect(err => {
  if (!err) console.log("DB Connected successfully!");
  else
    console.log(
      "DB connection Failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

app.listen(PORT, () => {
  console.log("Express Server is running at port No : " + PORT);
});

app.get("/employees", (req, res) => {
  mysqlConnection.query("SELECT * FROM employee", (err, rows, fileds) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.get("/employee/:Id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM employee WHERE EmpID = ?",
    [req.params.Id],
    (err, rows, fileds) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});
