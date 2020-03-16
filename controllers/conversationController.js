
var Conversation = require('../models/conversation');

var async = require('async');

// Display Peaksay conversation create form on GET.
exports.convo_create_get = function(req, res) { 
    res.sendFile(__rootdir + "/public/peaksay-form.html");
};

// Handle Peaksay conversation create on POST.
exports.convo_create_post = function(req, res) {
    console.log("conversation post function has been called");

  var conversation = new Conversation(
    {
      title: req.body.title,
      language: req.body.language,
      difficulty: req.body.difficulty,
      characters: {
        names: [req.body.character1, req.body.character2],
        images: ['no image', 'no image'],
      },
      lines: [
        req.body.line1,
        req.body.line2,
        req.body.line3,
        req.body.line4,
        req.body.line5,
        req.body.line6,
        req.body.line7,
        req.body.line8,
        req.body.line9,
        req.body.line10,
      ],
      translations: [
        'no translation',
        'no translation',
        'no translation',
        'no translation',
        'no translation',
        'no translation',
        'no translation',
        'no translation',
        'no translation',
        'no translation',
      ],
      audio: [],
    }
    
  );

    conversation.save(function (err) {
        if (err) return console.error(err);
        console.log("New conversation created in database: " + conversation.title);
        res.redirect('/peaksay/sandbox');

    });


}

// Display list of all conversations.
exports.conversation_list = function(req, res, next) {

    Conversation.find({}, 'title language difficulty', function(err, conversations) {
        if (err) return handleError(err);
        res.render('peaksay_convos', {conversation_list: conversations}); // IMPORTANT: "conversation-list" is a local variable that will be passed on to the view

    });

};

// Render start screen/landing page populated with list of conversations from database
exports.render_start_screen = function(req, res, next) {

    Conversation.find({}, function(err, conversations) {
        if (err) return handleError(err);
        res.render('peaksay_layout', {conversation_list: conversations}); // IMPORTANT: "conversation-list" is a local variable that will be passed on to the view
    });

};


// display details of a specific conversation (at a unique URL)
exports.convo_detail = function(req, res) {

    Conversation.findById(req.params.id, function(err, convo_this) {
        if (err) return handleError(err);
        res.render('peaksay_convo_edit', {convo: convo_this});
    });

};


// delete a conversation
exports.convo_delete = function(req, res) {

    Conversation.findByIdAndDelete(req.body.convoid, function(err) {
        if(err) console.log(err);
        console.log("Conversation deleted!");
        res.redirect('/peaksay/conversations');
    });

};
