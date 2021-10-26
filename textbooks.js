const express = require('express');
const mysql = require('./dbcon.js');
const router = express.Router();

router
  .get('/', function(req, res) {
    const context = { page: "textbooks" };

    // sample data
    context.textbooks = [
      {
        textbook_id: 1,
        textbook_isbn: null,
        name: "title1",
        author: "author1"
      },
      {
        textbook_id: 2,
        textbook_isbn: null,
        name: "title2",
        author: "author2"
      },
    ]

    res.render('textbooks', context);
  });

module.exports = router;