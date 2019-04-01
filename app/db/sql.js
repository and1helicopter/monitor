import sqlite3 from 'sqlite3';

var db = new sqlite3.Database('./file.db');

db.serialize(function () {
    db.run("CREATE TABLE Products (name, barcode, quantity)");
  
    db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product001', 'xxxxx', 20]);
    db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product002', 'xxxxx', 40]);
    db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product003', 'xxxxx', 60]);
  
    db.each("SELECT * FROM Products", function (err, row) {
      console.log(row);
    });
});