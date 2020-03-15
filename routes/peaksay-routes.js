var express = require('express');

var router = express.Router();

var app = express();

/* REDIRECT to Peaksay. */
router.get('/', function(req, res) {
    res.sendFile( __rootdir + "/public/" + "peaksay.html");
});

// redirect to "various" Peaksay pages
router.get('/learn', function(req, res) {
    res.sendFile( __rootdir + "/public/" + "peaksay-learn.html");
  });

module.exports = router;

