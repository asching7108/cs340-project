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
    const context = { page: "courses" };

    // // sample data
    // context.courses = [
    //   {
    //     course_id: 1,
    //     name: "Introduction to Databases",
    //     year: 2021,
    //     term: "Fall",
    //     instructor_id: 1,
    //     textbook_id: 1
    //   },
    //   {
    //     course_id: 2,
    //     name: "Intro to Computer Networks",
    //     year: 2021,
    //     term: "Fall",
    //     instructor_id: 2,
    //     textbook_id: null
    //   },
    // ];

    const { filter_type, name, year, term, instructor_name } = req.query;
    const sql = `SELECT c.course_id, c.name, c.year, c.term, i.instructor_id, CONCAT(i.first_name, ' ', i.last_name) as 'instructor_name', t.textbook_id, t.name as 'textbook_title' 
                FROM Course c
                INNER JOIN Instructor i ON c.instructor_id = i.instructor_id 
                LEFT JOIN Textbook t ON c.textbook_id = t.textbook_id
                WHERE 1
                ${name ? `AND c.name LIKE CONCAT('%', ?, '%')` : ''}
                ${year ? `AND c.year = ?` : ''}
                ${term ? `AND c.term = ?` : ''}
                ${instructor_name ? `AND CONCAT(i.first_name, ' ', i.last_name) LIKE CONCAT('%', ?, '%')` : ''}
                ORDER BY c.year DESC, c.term, c.name`;
    const values = [];
    if (name) values.push(name);
    if (year) values.push(year);
    if (term) values.push(term);
    if (instructor_name) values.push(instructor_name);

    mysql.pool.query(sql, values, function(error, result) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      else {
        context.filter_type = filter_type ? filter_type : "by_name";
        context.name = name;
        context.year = year;
        context.term = term;
        context.instructor_name = instructor_name;
        context.courses = result;
        // gets all instructors for dropdown
        const instructors_sql = 'SELECT * FROM Instructor ORDER BY first_name, last_name';
        mysql.pool.query(instructors_sql, function(error, result) {
          if (error) {
            res.write(JSON.stringify(error));
            res.end();
          }
          else {
            context.instructors = result;
            // gets all textbooks for dropdown
            const textbooks_sql = 'SELECT * FROM Textbook ORDER BY name';
            mysql.pool.query(textbooks_sql, function(error, result) {
              if (error) {
                res.write(JSON.stringify(error));
                res.end();
              }
              else {
                context.textbooks = result;
                res.render('courses', context);
              }
            });
          }
        });
      }
    });
  });

router
  .post('/', urlencodedParser, function(req, res) {
    const { name, year, term, instructor_id, textbook_id } = req.body;
    const sql = 'INSERT INTO Course (name, year, term, instructor_id, textbook_id) VALUES (?, ?, ?, ?, ?)';
    const values = [name, year, term, instructor_id, textbook_id ? textbook_id : null];

    mysql.pool.query(sql, values, function(error, result) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/courses');
      }
    });
  });

module.exports = router;