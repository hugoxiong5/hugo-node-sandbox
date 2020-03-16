var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConversationSchema = new Schema(
  {
    title: {type: String, required: true},
    language: {type: String, required: true},
    difficulty: {type: String, required: true},
    character1: {type: String, required: true},
    character2: [{type: String, required: true}],
    line1: {type: String, required: true},
    line2: {type: String, required: true},
    line3: {type: String},
    line4: {type: String},
  }
);

//Export Conversation model
module.exports = mongoose.model('Conversation', ConversationSchema);





/*
const conversation8 = {
  id: 8,
  title: 'Integrated Chinese 2：第十九课：旅游：Dialogue 2',
  language: 'zh',
  difficulty: 'B1',
  characters: {
    names: ['杨丽', '王朋'],
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThYagI1j0Uplr1jNzfM_SAsCvdOOHyOikHt0qIeUK1S2OaLQc3', 'https://pbs.twimg.com/media/CkrSZh1UgAIlHgF.jpg'],
  },
  lines: [
    '天一旅行社，你好。',
    '你好。 请问六月初到北京的机票多少钱？',
    '您要买单程票还是往返票？',
    '我要买两张往返票。',
    '你想买哪家航空公司的？',
    '哪家的便宜，就买哪家的。',
    '请等等，我查一下……好几家航空公司，都有航班。',
    '哪些航班？',
    '中国国际航空公司，一千五，直飞。西北航空公司正在打折，可是要转机。',
    '西北只比国航便宜四十几块钱，我还是买国航吧。',
    '哪一天走？哪一天回来？',
    '六月十号走，七月十五号回来。现在可以订位子吗？',
    '可以。你们喜欢靠窗户的还是靠走道的？',
    '靠走道的。对了，我朋友吃素，麻烦帮她订一份素餐。',
    '没问题……您在北京要订旅馆，租车吗？',
    '不用，谢谢！'
  ],
  translations: [
    'Tianyi Travel Agency, good morning.',
    'Good morning. How much is a ticket to Beijing for the beginning of June?',
    'Do you buy a one-way or a round-trip?',
    'I want to buy round-trip tickets.',
    'Which airline company?',
    'Which airline is the least expensive, that\'s the one I will take.',
    'Please wait a moment. Let me check. Quite a few airlines, all have flights.',
    'Which ones?',
    'Air China, ¥1500, direct flight. Southwest is having a discount, but have to transfer flights',
    'Southwest is only ¥40 cheaper than Air China, I\'ll fly Air China.',
    'What day does it leave? What day does it come back?',
    'Leaves on the 6th, returns on the 7th. Do you want to reserve a seat now?',
    'Yes. Do you want to sit next to the window or next to the aisle?',
    'Next to the aisle. Oh, my friend is vegetarian, would you please reserve a vegetarian meal',
    'No problem... in Beijing do you want to book a hotel, rent a car?',
    'No, thanks!',
  ],
  audio: [],
};
*/
