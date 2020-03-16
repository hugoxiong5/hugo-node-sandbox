var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConversationSchema = new Schema(
  {
    title: {type: String, required: true},
    language: {type: String, required: true},
    difficulty: {type: String, required: true},
    characters: {
      names: [{type: String, required: true}, {type: String, required: true}],
      images: [{type: String}, {type: String}],
    },
    lines: [
      {type: String, required: true},
      {type: String, required: true},
      {type: String, requred: true},
      {type: String, required: true},
      {type: String},
      {type: String},
      {type: String},
      {type: String},
      {type: String},
      {type: String},
    ],
    translations: [
      {type: String},
      {type: String},
      {type: String},
      {type: String},
      {type: String},
      {type: String},
      {type: String},
      {type: String},
      {type: String},
      {type: String},
    ],
    audio: [{type: String}],
  }
);

// ConversationSchema.set('validateBeforeSave', false);

//Export Conversation model
module.exports = mongoose.model('Conversation', ConversationSchema);





/*
const conversation8 = 
*/


// var ConversationSchema = new Schema(
//   {
//     title: {type: String, required: true},
//     language: {type: String, required: true},
//     difficulty: {type: String, required: true},
//     character1: {type: String, required: true},
//     character2: [{type: String, required: true}],
//     line1: {type: String, required: true},
//     line2: {type: String, required: true},
//     line3: {type: String},
//     line4: {type: String},
//   }
// );