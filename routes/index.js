var express = require('express');

var router = express.Router();

/* REDIRECT to main home page (Catalog). */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

// redirect to "Learn-Mode" page
router.get('/learn-mode', function(req, res) {
  res.sendFile(path.join('/Users/hugo/Dropbox/Programming/Node-JS-sandbox/tutorial-projects/local-library/learn-mode.html'));
});

module.exports = router;
