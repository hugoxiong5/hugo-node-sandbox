var conversation_controller = require('../controllers/conversationController');

var express = require('express');

var router = express.Router();

var app = express();

// render the "start screen", pull in conversations from database
router.get('/sandbox', conversation_controller.render_start_screen);

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

// GET request for one conversation at a unique URL.
router.get('/conversation/:id', conversation_controller.convo_detail);

// POST request (update/delete?)
router.post('/conversation/:id', conversation_controller.convo_delete);

module.exports = router;

