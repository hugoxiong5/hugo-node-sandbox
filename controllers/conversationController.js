
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

// Display Peaksay conversation create form on GET.
exports.convo_create_get = function(req, res, next) { 
    res.sendFile( __rootdir + "/public/peaksay-form.html");
};

// Handle Peaksay conversation create on POST.
exports.convo_create_post = function(req, res) {
    res.send('YOUR CONVERSATION WAS SENT TO THE SERVER! ... But no data was saved...');
}





