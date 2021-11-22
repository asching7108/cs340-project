const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('./dbcon.js');
const router = express.Router();
const app = express();

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router
    .get('/', function (req, res) {
        const context = { page: "students" };

      // // sample data
       // context.students = [
          // {
               // student_id: 1,
               // first_name: "Charles",
               // last_name: "Sherwood",
               // email: "charlessherwood@123.com",
               // type: "Post-Bacc"
           // },
           // {
               // student_id: 2,
               // first_name: "Hsing-Yi",
               // last_name: "Lin",
               // email: "hisngyilin@123.com",
               // type: "Post-Bacc"
            // },
        // ]

        const { name, type } = req.query
        const sql = `SELECT *
                     FROM Student
                     WHERE 1
                     ${name ? `AND CONCAT(first_name, ' ', last_name) LIKE CONCAT('%', ?, '%')` : ''}
                     ${type ? `AND type = ?` : ''}
                     ORDER BY first_name, last_name`;
        const values = [];
        if (name) values.push(name);
        if (type) values.push(type);

        mysql.pool.query(sql, values, function (error, result) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            else {
                context.name = name;
                context.type = type;
                context.students = result;
                res.render('students', context);
            }
        });
    });

router
    .post('/', urlencodedParser, function (req, res) {
        const { first_name, last_name, email, type } = req.body;
        const sql = 'INSERT INTO Student (first_name, last_name, email, type) VALUES (?, ?, ?, ?)';
        const values = [first_name, last_name, email, type];

        mysql.pool.query(sql, values, function (error, result) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/students');
            }
        });
    });

module.exports = router;