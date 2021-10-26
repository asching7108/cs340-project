const express = require('express');
const mysql = require('./dbcon.js');
const router = express.Router();

router
  .get('/', function(req, res) {
    const context = { page: "courses-students" };

    // sample data
    context.courses_students = [
      {
        course_id: 1,
        student_id: 1
      },
      {
        course_id: 1,
        student_id: 2
      },
      {
        course_id: 2,
        student_id: 1
      },
    ]

    res.render('courses_students', context);
  });

module.exports = router;