var express = require('express');

var router = express.Router();

/* REDIRECT to main home page (Catalog). */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

module.exports = router;
