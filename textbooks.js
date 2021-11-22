const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('./dbcon.js');
const router = express.Router();
const app = express();

const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router
  .get('/', function(req, res) {
    const context = { page: "textbooks" };

   // // sample data
   // context.textbooks = [
   //   {
   //     textbook_id: 1,
   //     textbook_isbn: null,
   //     name: "title1",
   //     author: "author1"
   //   },
   //   {
   //     textbook_id: 2,
   //     textbook_isbn: null,
   //     name: "title2",
   //     author: "author2"
   //   },
   // ]
  
    const { filter_type, isbn, name, author } = req.query
    const sql = `SELECT textbook_id, textbook_isbn, name, author
                FROM Textbook 
                WHERE 1
                ${isbn ? `AND textbook_isbn LIKE CONCAT('%', ?, '%')` : ''}
                ${name ? `AND name LIKE CONCAT('%', ?, '%')` : ''}
                ${author ? `AND author LIKE CONCAT('%', ?, '%')` : ''}
                ORDER BY name DESC`;

    const values = [];
    if (isbn) values.push(isbn);
    if (name) values.push(name);
    if (author) values.push(author);
  
    mysql.pool.query(sql, values, function(error, result) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      else {
        context.filter_type = filter_type ? filter_type: "by_name";
        context.isbn = isbn;
        context.name = name;
        context.author = author;
        context.textbooks = result;
        res.render('textbooks', context);
      }
    });
  });

router
  .post('/', urlencodedParser, function(req, res) {
    const { textbook_isbn, name, author } = req.body;
    const sql = 'INSERT INTO Textbook (textbook_isbn, name, author) VALUES (?, ?, ?)';
    const values = [textbook_isbn, name, author];
  
    mysql.pool.query(sql, values, function(error, result) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/textbooks');
      }
    });
  });
        
module.exports = router;
