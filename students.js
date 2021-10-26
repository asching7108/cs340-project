const express = require('express');
const mysql = require('./dbcon.js');
const router = express.Router();

router
  .get('/', function(req, res) {
    const context = { page: "students" };

    // sample data
    context.students = [
      {
        student_id: 1,
        first_name: "Charles",
        last_name: "Sherwood",
        email: "charlessherwood@123.com",
        type: "Post-Bacc"
      },
      {
        student_id: 2,
        first_name: "Hsing-Yi",
        last_name: "Lin",
        email: "hisngyilin@123.com",
        type: "Post-Bacc"
      },
    ]

    res.render('students', context);
  });

module.exports = router;