var express = require('express');

var router = express.Router();

/* REDIRECT to Peaksay sandbox */
router.get('/', function(req, res) {
  res.redirect('/peaksay/sandbox');
});

module.exports = router;
