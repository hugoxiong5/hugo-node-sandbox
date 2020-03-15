var conversation_controller = require('../controllers/conversationController');

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

// Peaksay: create conversation form

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/create', conversation_controller.convo_create_get);

// // POST request for creating Book.
router.post('/create', conversation_controller.convo_create_post);


module.exports = router;

