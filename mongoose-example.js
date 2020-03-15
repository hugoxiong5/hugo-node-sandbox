//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://hugo:hugo@cluster0-kmdtl.mongodb.net/local_library?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  // var kittySchema = new mongoose.Schema({
  //   name: String
  // });

  // var Kitten = mongoose.model('Kitten', kittySchema);
  // var silence = new Kitten({ name: 'Silence' });
  // console.log(silence.name);
  // var fluffy = new Kitten({ name: 'fluffy' });

  // fluffy.save(function (err, fluffy) {
  //   if (err) return console.error(err);
  //   console.log("this fluffy has been saved to the database!");
  // });


  // Kitten.find(function (err, kittens) {
  //   if (err) return console.error(err);
  //   console.log(kittens);
  // });


  var conversationSchema = new mongoose.Schema(
    {
      id: Number,
      title: String,
      language: String,
      difficulty: String,
      character1: String,
      character2: String,
      line1: String,
      line2: String,
      line3: String,
      line4: String
    }
  );

  var Conversation = mongoose.model('Conversation', conversationSchema);

  var conversation1 = new Conversation(
    {
      id: 8,
      title: 'Integrated Chinese 2：第十九课：旅游：Dialogue 2',
      language: 'zh',
      difficulty: 'B1',
      character1: '杨丽',
      character2: '王朋',
      line1: '天一旅行社，你好。',
      line2: '你好。 请问六月初到北京的机票多少钱？',
      line3: '您要买单程票还是往返票？',
      line4: '我要买两张往返票。'
    }
  );

  // conversation1.save(function (err, fluffy) {
  //   if (err) return console.error(err);
  //   console.log("this conversation has been saved to the database!");
  // });

  var conversation2 = new Conversation(
    {
      id: 10,
      title: 'whatever',
      language: 'zh',
      difficulty: 'B1',
      character1: '杨丽',
      character2: '王朋',
      line1: '天一旅行社，你好。',
      line2: '你好。 请问六月初到北京的机票多少钱？',
      line3: '您要买单程票还是往返票？',
      line4: '我要买两张往返票。'
    }
  );

  // conversation2.save();

  // Conversation.find(function (err, conversations) {
  //   if (err) return console.error(err);
  //   console.log(conversations);
  // });

  let conversationCurrent = conversation1;

  // const query = Conversation.find({ title: 'whatever'});
  // query.getFilter();
  // console.log(query);

  conversationCurrent.title = 'French Dialogue';

  conversationCurrent.save(function (err) {
    if (err) return console.error(err);
    console.log("this conversation has been saved to the database!");
  });
  
  // Conversation.find({ title: 'whatever'});
  // console.log('conversations with a title of whatever: ' + found);

  //   Conversation.find(function (err, { title: 'whatever'}) {
  //   if (err) return console.error(err);
  //   console.log(conversations);

});







// var Schema = mongoose.Schema;

// var ConversationSchema = new Schema(
//   {
//     title: {type: String, required: true},
//     language: {type: String, required: true},
//     difficulty: {type: String, required: true},
//     character1: {type: String, required: true},
//     character2: [{type: String, required: true}],
//     line1: {type: String, required: true},
//     line2: {type: String, required: true},
//     line3: {type: String, required: true},
//     line4: {type: String, required: true},
//   }
// );

// //Export model
// module.exports = mongoose.model('Conversation', ConversationSchema);



// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

// var kittySchema = new mongoose.Schema({
//   name: String
// });

// var Kitten = mongoose.model('Kitten', kittySchema);


// var silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'

// kittySchema.methods.speak = function () {
//   var greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name";
//   console.log(greeting);
// }

// var Kitten = mongoose.model('Kitten', kittySchema);

