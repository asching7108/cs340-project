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
    const context = { page: "students" };

   // // sample data
   // context.students = [
   //   {
   //     student_id: 1,
   //     first_name: "Charles",
   //     last_name: "Sherwood",
   //     email: "charlessherwood@123.com",
   //     type: "Post-Bacc"
   //   },
   //   {
   //     student_id: 2,
   //     first_name: "Hsing-Yi",
   //     last_name: "Lin",
   //     email: "hisngyilin@123.com",
   //     type: "Post-Bacc"
   //   },
   // ];

    const { filter_type, name, type } = req.query;
    const sql = `SELECT first_name, last_name, email, type 
                FROM Student
                WHERE 1
                ${type ? `AND type = ?` : ''}
                ${name ? `AND CONCAT (first_name, ' ', last_name) LIKE CONCAT('%', ?, '%')` : ''}
                ORDER BY first_name, last_name`;
    const values = [];
    if (name) values.push(name);
    if (type) values.push(type);
  
    mysql.pool.query(sql, values, function(error, result) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      else {
        context.filter_type = filter_type ? filter_type : "by_type";
        context.type = type;
        context.name = name;
        context.students = result;
            
// stopped here
  
    res.render('students', context);
  });

module.exports = router;
