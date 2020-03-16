
var Conversation = require('../models/conversation');

var async = require('async');


// Display Peaksay conversation create form on GET.
exports.convo_create_get = function(req, res) { 
    res.sendFile( __rootdir + "/public/peaksay-form.html");
};

// Handle Peaksay conversation create on POST.
exports.convo_create_post = function(req, res) {
    console.log("conversation post function has been called");

    // Create a simple Conversation object/document.
    var conversation = new Conversation(
        {   title: req.body.title,
            language: req.body.language,
            difficulty: req.body.difficulty,
            character1: req.body.character1,
            character2: req.body.character2,
            line1: req.body.line1,
            line2:req.body.line2,
            line3:req.body.line3,
            line4: req.body.line4
        });

    console.log(conversation);

    conversation.save(function (err) {
        if (err) return console.error(err);
        console.log("New conversation created in database: " + conversation.title);
        res.redirect('../peaksay/conversations');
    });


}

// Display list of all conversations.
exports.conversation_list = function(req, res, next) {

    Conversation.find({}, 'title', function(err, conversations) {
        if (err) return handleError(err);
        res.render('peaksay_convos', {hello: conversations}); // IMPORTANT: "conversation-list" is a local variable that will be passed on to the view

    });

};

// Render start screen/landing page populated with list of conversations from database
exports.render_start_screen = function(req, res, next) {

    Conversation.find({}, function(err, conversations) {
        if (err) return handleError(err);
        res.render('peaksay_layout', {conversation_list: conversations}); // IMPORTANT: "conversation-list" is a local variable that will be passed on to the view
    });

};



    //     .exec(function (err, list_authors) {
    //         if (err) { return next(err); }
    //         //Successful, so render
    //         res.render('author_list', { title: 'Author List', author_list: list_authors });
    //       });

    // Conversation.find()
    //   .exec(function (err, list_conversation) {
    //     if (err) { return next(err); }
    //     //Successful, so render
    //     res.render('peaksay_convos', { title: 'Conversation List', conversation_list: list_conversation });
    //   });

            // let conversationList = [];

        // conversations.forEach(convo);
        // function convo(item) {
        //     conversationList.push(item);
        // }
        
        // console.log("Conversation List:");
        // console.log(conversationList);


    // Conversation.find(function (err, conversations) {
//     if (err) return console.error(err);
//     console.log(conversations);
//     });

    // Conversation.find({}, 'title language difficulty')
    //   .exec(function (err, list_convos) {
    //     if (err) { return next(err); }
    //     // Successful, so render
    //     res.render('peaksay_convos', { title: 'Peaksay Conversation List', list_convos });
    //   });
      
// };


//   // Display list of all books.
//   exports.book_list = function(req, res, next) {

//     Book.find({}, 'title author')
//       .populate('author')
//       .exec(function (err, list_books) {
//         if (err) { return next(err); }
//         //Successful, so render
//         res.render('book_list', { title: 'Book List', book_list: list_books });
//       });
      
//   };

// var BookSchema = new Schema(
//     {
//       title: {type: String, required: true},
//       author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
//       summary: {type: String, required: true},
//       isbn: {type: String, required: true},
//       genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
//     }
//   );





// HTTP is stateless, so you can’t redirect to another page and pass messages along without the help of a session cookie to persist that message between HTTP requests. A “flash message” is the name given to this kind of one-time-only message we want to persist across a redirect and then disappear.


