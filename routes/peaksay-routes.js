var conversation_controller = require('../controllers/conversationController');

var express = require('express');

var router = express.Router();

var app = express();

/* send "normal program" for Peaksay root page. */
router.get('/', function(req, res) {
    res.sendFile(__rootdir + "/public/peaksay.html");
});

// sendPeaksay learn-mode only program at this address
router.get('/learn', function(req, res) {
    res.sendFile(__rootdir + "/public/peaksay-learn.html");
});

// Conversation List page -- call controller function
router.get('/conversations', conversation_controller.conversation_list);

// Peaksay "create conversation" form:
// GET request for creating a conversation.
router.get('/create', conversation_controller.convo_create_get);

// // POST request for creating a conversation.
router.post('/create', conversation_controller.convo_create_post);

// Experiment with passing array of conversations from database as local variable to static HTML page
router.get('/sandbox', conversation_controller.render_start_screen);

// router.get('/sandbox', function(req, res) {
//   res.render('peaksay_layout');
// });


module.exports = router;

