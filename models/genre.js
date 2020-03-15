// store genres (e.g. fiction, non-fiction, romance, military history, etc.)
var mongoose = require('mongoose');

//The model should have a String SchemaType called name to describe the genre.
// This name should be required and have between 3 and 100 characters.

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
  {
    name: {type: String, required: true, min: 3, max: 100},
  }
)

// Declare a virtual for the genre's URL, named url.
GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genre/' + this._id;
});

// Export the model.
module.exports = mongoose.model('Genre', GenreSchema);
