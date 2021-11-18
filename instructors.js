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
    const context = { page: "instructors" };
    
    // // sample data
    // context.instructors = [
    //   {
    //     instructor_id: 1,
    //     first_name: "Steve",
    //     last_name: "Jobs",
    //     email: "stevejobs@123.com"
    //   },
    //   {
    //     instructor_id: 2,
    //     first_name: "Bill",
    //     last_name: "Gates",
    //     email: "billgates@123.com"
    //   },
    // ];

    const { name } = req.query;
    const sql = `SELECT * FROM Instructor
                ${name ? `WHERE CONCAT(first_name, ' ', last_name) LIKE CONCAT('%', ?, '%')` : ''}
                ORDER BY first_name, last_name`;
    const values = [];
    if (name) values.push(name);

    mysql.pool.query(sql, values, function(error, result) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      else {
        context.name = name;
        context.instructors = result;
        res.render('instructors', context);
      }
    });
  });

router
  .post('/', urlencodedParser, function(req, res) {
    const { first_name, last_name, email } = req.body;
    const sql = 'INSERT INTO Instructor (first_name, last_name, email) VALUES (?, ?, ?)';
    const values = [first_name, last_name, email];

    mysql.pool.query(sql, values, function(error, result) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/instructors');
      }
    });
  });

module.exports = router;