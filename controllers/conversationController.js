
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


// Author.findById(req.body.authorid).exec(callback)
// },
// authors_books: function(callback) {
//   Book.find({ 'author': req.body.authorid }).exec(callback)
// },
// }, function(err, results) {
// if (err) { return next(err); }
// // Success
// if (results.authors_books.length > 0) {
//     // Author has books. Render in same way as for GET route.
//     res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
//     return;
// }
// else {
//     // Author has no books. Delete object and redirect to the list of authors.
//     Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
//         if (err) { return next(err); }
//         // Success - go to author list
//         res.redirect('/catalog/authors')
//     })









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


