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
        const context = { page: "courses-students" };

        // sample data
        //context.courses_students = [
          //  {
            //    student_name: 1,
              //  course_name: 1,
               // year: 2020,
                //term: 'Spring'
           // },
           // {
             //   course_id: 1,
               // student_id: 2
           // },
           // {
             //   course_id: 2,
               // student_id: 1
            //},
        //]

        const { filter_type, name, id, student_name, student_id } = req.query;
        const sql = `SELECT s.student_id, CONCAT(s.first_name, ' ', s.last_name) as 'student_name', c.course_id, c.name, c.year, c.term
                    FROM Course_Student cs
                    INNER JOIN Student s on cs.student_id = s.student_id
                    INNER JOIN Course c on cs.course_id = c.course_id
                    WHERE 1
                    ${name ? `AND c.name LIKE CONCAT('%', ?, '%')` : ''}
                    ${id ? `AND c.course_id = ?` : ''}
                    ${student_name ? `AND CONCAT(s.first_name, ' ', s.last_name) LIKE CONCAT('%', ?, '%')` : ''}
                    ${student_id ? `AND s.student_id = ?` : ''}
                    ORDER BY s.student_id`;
        const values = [];
        if (name) values.push(name);
        if (id) values.push(id);
        if (student_name) values.push(student_name);
        if (student_id) values.push(student_id);

        mysql.pool.query(sql, values, function (error, result) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            else {
                context.filter_type = filter_type ? filter_type : "by_name";
                context.name = name;
                context.id = id;
                context.student_name = student_name;
                context.student_id = student_id;
                context.courses_students = result;
                // gets all courses for dropdown
                const course_sql = 'SELECT * FROM Course ORDER BY course_id';
                mysql.pool.query(course_sql, function (error, result) {
                    if (error) {
                        res.write(JSON.stringify(error));
                        res.end();
                    }
                    else {
                        context.courses = result;
                        // gets all students for dropdown
                        const student_sql = 'SELECT * FROM Student ORDER BY student_id';
                        mysql.pool.query(student_sql, function (error, result) {
                            if (error) {
                                res.write(JSON.stringify(error));
                                res.end();
                            }
                            else {
                                context.students = result;
                                res.render('courses_students', context);
                            }
                        })
                    }
                })
            }
        })
    });

router
    .post('/', urlencodedParser, function(req, res) {
        const { course_id, student_id } = req.body;
        const sql = 'INSERT INTO Course_Student (course_id, student_id) VALUES (?, ?)';
        const values = [course_id, student_id];

        mysql.pool.query(sql, values, function (error, result) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/courses-students');
            }
        });
    });

module.exports = router;