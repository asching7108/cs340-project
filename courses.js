const express = require('express');
const mysql = require('./dbcon.js');
const router = express.Router();

router
  .get('/', function(req, res) {
    const context = { page: "courses" };

    // sample data
    context.courses = [
      {
        course_id: 1,
        name: "Introduction to Databases",
        year: 2021,
        term: "Fall",
        instructor_id: 1,
        textbook_id: 1
      },
      {
        course_id: 2,
        name: "Intro to Computer Networks",
        year: 2021,
        term: "Fall",
        instructor_id: 2,
        textbook_id: null
      },
    ]

    res.render('courses', context);
  });

module.exports = router;