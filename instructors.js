const express = require('express');
const mysql = require('./dbcon.js');
const router = express.Router();

router
  .get('/', function(req, res) {
    const context = { page: "instructors" };

    // sample data
    context.instructors = [
      {
        instructor_id: 1,
        first_name: "Steve",
        last_name: "Jobs",
        email: "stevejobs@123.com"
      },
      {
        instructor_id: 2,
        first_name: "Bill",
        last_name: "Gates",
        email: "billgates@123.com"
      },
    ]

    res.render('instructors', context);
  });

module.exports = router;