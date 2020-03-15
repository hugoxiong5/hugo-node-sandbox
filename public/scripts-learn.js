
/*-------------------------------------------------------------------
LEARN MODE: GAME SETUP
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
1. CONVERSATION SETS (hard-coded dataset)
-------------------------------------------------------------------*/

// This is the conversation object that stores the dialogue to be used in the game. In addition to the lines of the conversation, it also stores info about roles (i.e. the two characters, who is speaking which line, etc.);
// Note that CHARACTER 1 (e.g. Bob) always has EVEN LINES in the array (0, 2, 4, and so on), while CHARACTER 2 has ODD LINES (1, 3, 5, etc)
let conversation = {};

// This is the "default" blank conversation object template 
// (Note: this will be changed to a constructor function in a later version, i.e. when it's possible to dynamically add/edit conversations via a server)
const conversation0 = {
  id: 0,
  title: '',
  language: '',
  difficulty: '',
  characters: {
    names: [],
    images: [],
  },
  lines: [],
  translations: [],
  audio: [],
};

const conversation1 = {
  id: 1,
  title: 'Bob and Alice talk about the weather',
  language: 'en',
  difficulty: 'A1',
  characters: {
    names: ['Bob', 'Alice'],
    images: ['https://m.media-amazon.com/images/M/MV5BNjRlYjgwMWMtNDFmMy00OWQ0LWFhMTMtNWE3MTU4ZjQ3MjgyXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_CR0,45,480,270_AL_UX477_CR0,0,477,268_AL_.jpg', 'http://images6.fanpop.com/image/photos/33900000/Alice-PNG-alice-in-wonderland-33923432-585-800.png'],
  },
  lines: [
    'Hi, Alice. How are you doing?',
    'Great, Bob. And you?',
    "I'm tired. What's the weather today?",
    "It's going to rain.",
    'I love rain.',
    'Not me! I hate rain. Goodbye, Bob!',
    'Bye, Alice!'
  ],
  translations: [],
  audio: [],
};

const conversation2 = {
  id: 2,
  title: 'Integrated Chinese 3：第一课（开学）',
  language: 'zh',
  difficulty: 'B1',
  characters: {
    names: ['张天明', '柯林'],
    images: ['http://my.cheng-tsui.com/files/images/1.3.gif', 'http://my.cheng-tsui.com/files/images/KeLin.gif'],
  },
  lines: [
    '人真多！',
    '你是新生吧？',
    '是, 我是新生. 你呢?',
    '我是研究生. 在这儿帮新生搬东西. 请问， 你叫什么名字？',
    '我叫张天明。',
    '张天明？ 是中文名字吗？',
    '对, 我爸爸妈妈是从中国来的。可是我是在美国出生, 在美国长大的。请问你的名字是... ?',
    '我正在学中文, 我的中文名字是柯林。你的名字是哪三个字?',
    '张是弓长张，就是一张纸的张, 天是天气的天， 明是明天的明.',
    '你是怎么来学校的?',
    '我先坐飞机, 从机场到学校坐出租汽车， 柯林, 你也住在这儿吗？',
    '不, 这是新生宿舍， 我住在校外.',
    '是吗？ 你为什么校住？ 你觉得住在校内好, 还是住在校外好? ',
    '有的人喜欢住在校外，因为校外的房子比较便宜. 我住在校外, 除了想省点儿钱以外， 还为了自由。',
    '真的吗？ 那我以后也搬校外去。',
    '你刚来, 在学校住对你有好处， 可以适应一下学校的生活。要是你以后想搬家, 我可以帮你找房子。',
    '好吧， 我以后要是搬家， 一定请你帮忙。'
  ],
  translations: [],
  audio: [],
};

const conversation3 = {
  id: 3,
  title: 'Alí looks for a job!',
  language: 'es',
  difficulty: 'A2',
  characters: {
    names: ['Alí', 'Heidi'],
    images: ['https://collectionimages.npg.org.uk/std/mw65364/Muhammad-Ali.jpg', 'https://www.stickpng.com/assets/images/5a26b084087102040a95d4a8.png'],
  },
  lines: [
    '¡Buenos días! Vengo a la entrevista de trabajo…',
    'Si claro, siéntese por favor',
    'Gracias.',
    'Bien. ¿Cúal es su nombre?',
    'Me llamo Alí Mendez.',
    '¿Dónde vive usted?',
    'Vivo en la ciudad de San Diego.',
    '¿A qué se dedica?',
    'Soy doctor. Trabajo medio tiempo en una clínica.',
    'Bien, deme una copia de su hoja de vida y la revisaremos. Gracias por venir.',
    'Gracias a usted.'
  ],
  translations: [],
  audio: [],
};

const conversation4 = {
  id: 4,
  title: 'French: A new teacher',
  language: 'fr',
  difficulty: 'A2',
  characters: {
    names: ['Mary', 'Peter'],
    images: ['https://media.swncdn.com/cms/BST/52097-Blessed_Virgin_Mary.800w.tn.jpg', 'https://images.sk-static.com/images/media/profile_images/artists/587963/huge_avatar'],
  },
  lines: [
    "Salut Peter ! As-tu vu notre nouveau professeur d'anglais ?",
    "Salut Mary, oui, Je l'ai rencontré dans le bureau du principale.",
    "Il a l'air sympatique, n'est-ce pas ?",
    "Oui, j'ai l'impresion.",
    'Tu as appris ta lecon ?',
    "Non j'avais oublier mon livre. J'espère qu'il ne va pas m'interoger.",
    "J'espère pour toi."
  ],
  translations: [],
  audio: [],
};

//manually add audio for each line in Conversation 4
for (i=0; i<conversation4.lines.length; i++) {
  let line = new sound(`audio/speech/id4_line${i}.mp3`);
  line.sound.volume = 1;
  conversation4.audio.push(line);
}

const conversation5 = {
  id: 5,
  title: 'Wizard of Oz: Dorthy meets Glinda',
  language: 'en',
  difficulty: 'C1',
  characters: {
    names: ['Dorthy', 'Glinda'],
    images: ['https://imgix.ranker.com/user_node_img/50077/1001527391/original/dorothy-photo-u1?w=650&q=50&fm=pjpg&fit=crop&crop=faces', 'https://res.cloudinary.com/jerrick/image/upload/fl_progressive,q_auto,w_1024/am49kcbnusbv9ewfe81n.jpg'],
  },
  lines: [
    "Now I -- I know we're not in Kansas.",
    'Are you a good witch, or a bad witch?',
    "Who, me?  Why, I'm not a witch at all.  I'm Dorothy Gale from Kansas.",
    'Oh!  Well... is that the Witch?',
    "Who, Toto? Toto's my dog.",
    "Well, I'm a little muddled.  The Munchkins called me because a new witch has just dropped a house on the Wicked Witch of the East. And so what the Munchkins want to know... ...is, are you a good witch, or a bad witch?",
    "Oh, but I've already told you, I'm not a witch at all -- witches are old and ugly. What was that?",
    "The Munchkins.  They're laughing because I am a witch. I'm Glinda, the Witch of the North.",
    "You are!  Oh, I beg your pardon!  But I've never heard of a beautiful.... ...witch before.",
    'Only bad witches are ugly. The Munchkins are happy because you have freed them from the Wicked Witch of the East.',
    'Oh.  But, if you please -- what are Munchkins?',
    "The little people who live in this land -- it's Munchkinland, and you are their national heroine, my dear. It's all right-- you may all come out and thank her."
  ],
  translations: [],
  audio: [],
};

const conversation6 = {
  id: 6,
  title: 'Mr. Sea\'s A&I class',
  language: 'en',
  difficulty: 'B2',
  characters: {
    names: ['Mr. Sea', 'Mr. Xiong'],
    images: ['https://www.headroyce.org/uploaded/2019Images/WGL009065-45852.jpg', 'https://www.headroyce.org/uploaded/2019Images/WGL009065-49617.jpg'],
  },
  lines: [
    'Hi, Mr. Xiong!',
    'Hi, Mr. Sea. Can I audit your class?',
    'Sure. But you should know... I have some major pet peeves.',
    'What are your pet peeves?',
    'First, I always lock the door. If you come late, the door will be locked.',
    'No problem. I\'ll never be late.',
    'Second, when you need help, don\'t raise your hand.',
    'But what do I do if I need help?',
    'You need to join the queue.',
    'Okay... wait, why did you kick me from the queue?',
    'Because the name you wrote was inappropriate.',
    'I\'m sorry.',
    'My third pet peeve is, never give presentations with lists with one item.',
    'I only make lists with one item.',
    'Mr. Xiong, you have violated all of my pet peeves. You fail this class!',
    'It\'s okay, I\'m only auditing. I love A&I!'
  ],
  translations: [],
  audio: [],
};

const conversation7 = {
  id: 7,
  title: 'Integrated Chinese 3：第四课：买东西',
  language: 'zh',
  difficulty: 'B1',
  characters: {
    names: ['丽莎', '张天明'],
    images: ['http://my.cheng-tsui.com/files/images/Lisha.gif', 'http://my.cheng-tsui.com/files/images/1.3.gif'],
  },
  lines: [
    '你要买什么衣服？',
    '我想买一套运动服。',
    '这边儿就是。你看看这一套，样子、大小、长短都合适，而且打八折。',
    '颜色也不错。多少钱？什么牌子的？',
    '价钱不贵。这个牌子没听说过。不过，是纯棉的。',
    '牌子不好不行，我想买名牌的。',
    '你真时髦！穿名牌！那件好像是名牌的...哎呀，太贵了！',
    '买东西，我只买名牌的，要不然就不买，因为名牌的衣服质量好。',
    '你说的有道理。但是也不一定非买名牌不可。',
    '有的衣服便宜是便宜，可是牌子不好，穿一、两次就不想穿了，只好再买一件。',
    '我买衣服的标准，第一是穿着舒服不舒服，第二是质量好不好，第三是钱合适不合适。',
    '丽莎，难道你不在乎衣服的样子？',
    '是什么牌子的，样子时髦不时髦，我都不在乎。穿衣服是为了自己，不是为了给别人看。',
    '我不同意。你喜欢看雪梅穿不好看的衣服吗？',
    '雪梅穿什么衣服都好看，对不对？',
    '好，好，好，别说了。 哎，你身上这件衣服怎么是名牌的，你不是不穿名牌吗？',
    '我说不一定非买名牌不可，没说过不穿名牌呀。这件是打折的时候买的。',
    '好，丽莎，我买完衣服了。',
    '哎，张天明，我们去日用品那边看看。',
    '你们去吧，我先去付钱，我们一会儿见。',
    '等等。准备付现金，还是用信用卡？',
    '我刷卡。',
    '你知道，加上税一共是一百八十六块四。',
    '好...谢谢！再见。'
  ],
  translations: [
    'What clothes do you want to buy?',
    'I want to buy a set of sportswear.',
    'Here it is. If you look at this set, style, size, and length are all appropriate, and it\'s 20% off. ',
    'The colors are also good. How much is it? What brand? ',
    'Not expensive. Never heard of the brand before. However, it\'s pure cotton. ',
    'The brand is not good, I want to buy a famous brand. ',
    'You are so fashionable! Wearing brand names! That one seems to be a famous brand ... Oh, it\'s too expensive! ',
    'When  buying things, I only buy designer clothes, otherwise I won\'t buy them, because designer clothes are of good quality.',
    'You make sense. But it is not necessary to buy a famous brand. ',
    'Some clothes are cheap, but the brand is not good. After wearing them once or twice, I don\'t want to wear them anymore, so I have to buy another one. ',
    'For my criteria for buying clothes, firstly, they are comfortable, secondly, the quality is good, and thirdly, the price is appropriate. ',
    'Lisa, don\'t you care what the clothes look like? ',
    'What brand, what fashionable style... I don\'t care. Dressing is for your own sake, not for showing off to others. ',
    'I disagree. Do you like to watch Xuemei wear unsightly clothes? ',
    'Xuemei looks good on everything, right? ',
    'Okay, okay, okay, stop talking. Hey, this item of clothing you\'re wearing is brand-name, don\'t you not wear brand-names? ',
    'I said that I don\'t have to buy a brand name, I didn\'t say I don\'t wear them. I bought this at a discount. ',
    'Okay, Lisa, I\'m finished buying clothes. ',
    'Hey, Zhang Tianming, let\'s go over to look at the daily necessities. ',
    'Go ahead, I\'ll pay first, I\'ll see you later. ',
    'Wait. Are you going to pay in cash or a credit card? ',
    'I\'ll swipe my card. ',
    'You know, plus the tax, it\'s 186 yuan in total. ',
    'Okay... thank you! Goodbye. '
  ],
  audio: [],
};

//manually add audio for each line in Conversation 7
for (i=0; i<conversation7.lines.length; i++) {
  let line = new sound(`audio/speech/id7_line${i}.mp3`);
  line.sound.volume = 1;
  conversation7.audio.push(line);
}

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

//manually add audio for each line in Conversation 8
for (i=0; i<conversation8.lines.length; i++) {
  let line = new sound(`audio/speech/id8_line${i}.mp3`);
  line.sound.volume = 1;
  conversation8.audio.push(line);
}

/*-------------------------------------------------------------------
2. GAME VARIABLES
-------------------------------------------------------------------*/

// Set up global variables that will be used in multiple subsequent functions

// create array collecting all conversations
const conversationSet = [conversation1, conversation2, conversation3, conversation4, conversation5, conversation6, conversation7, conversation8];

// get major elements/sections of the page
const startScreen = document.getElementById('startScreen');
let convoGrid = document.getElementById('convoGrid');
const energyWindow = document.getElementById('energyWindow');
const announcementBox = document.getElementById('announcementBox');

const controlsWindow = document.getElementById('controlsWindow');
const dialogueWindow = document.getElementById('dialogueWindow');
const answerButtons = document.getElementById('answerButtonContainer');
const pauseButton = document.getElementById('pauseButton');

// get current dialogue lines
let currentLine1 = document.getElementById('currentLine1');
let currentLine2 = document.getElementById('currentLine2');

// get answer choice boxes (1, 2, 3, 4)
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const choice4 = document.getElementById('choice4');

// set up new game start states: 
let player1Correct = false;
let player1Mercy = false;
let player1LinesCorrect = 0;
let player1LinesWrong = 0;
let difficulty = 2; // DIFFICULTIES: 1 = easy, 2 = normal, 3 = hard

let player1ResponseTimes = [];
let player2ResponseTime = 0;
let player2ResponseTimeClock = 0;

let stop = false;
let gameOver = false;
let betweenTurns = false;

let playerTurn = 0;
let lineCounter = 0;
let audioLineCounter = 0;
let lineDuration = 0;
let round = 0;
let score1 = 0;
let score2 = 0;

// miscellaneous stuff
let warning = false;
let correctButton = '';
let averageTime = 0;

// Global Interval IDs. Also save all intervals into an array so that they can be cleared later when necessary--at end of turn, round, game, etc.
let intervals = [];
let energyInterval = 0;
let answerTimerInterval = 0;
let roundTimerInterval = 0;
let roundTimeout = 0;
let turnTimeout = 0;
let playConvoTimeout = 0;
let player2ResponseTimeout = 0;
let roundModalTimeOut = 0;

// LEARN MODE!!!
let learnMode = true; // always true
let energyContainer = document.getElementById('energyContainer');
let learnControlsWindow = document.getElementById('learnControlsWindow');
let rewindSpecial = false;

/*-------------------------------------------------------------------
5. MODAL WINDOWS
-------------------------------------------------------------------*/

// get Modal Window elements (there are 3 modals: instructions, round start, game over)
const modals = Array.from(document.getElementsByClassName('modal')); // converting the HTML collection of elements into an array
const closeBtns = Array.from(document.getElementsByClassName('close'));

const instructionsModal = document.getElementById('instructionsModal');
const roundModal = document.getElementById('roundModal');
const learnModeModal = document.getElementById('learnModeModal');
const gameOverModal = document.getElementById('gameOverModal');

// display the Instructions Modal when user clicks on How to Play button (onClick event)
function instructions() {
  softBtnSound.play();
  instructionsModal.style.display = 'block';
}

// When the user clicks anywhere outside of the modal window, close it (except for Learn Mode and Game Over Screen)
window.onclick = function (event) {
  for (i = 0; i < modals.length; i++) {
    if (event.target == (modals[i]) && modals[i] != gameOverModal && modals[i] != learnModeModal) {
      modals[i].style.display = 'none';
    }
  }
};

// When the user clicks on <span> close button (x), close the modal window
closeBtns.forEach((element) => {
  element.addEventListener("click", function() {
  hardBtnSound.play();
  modals.forEach(element => element.style.display = "none");
  })
});

/*-------------------------------------------------------------------
5. SOUNDS
-------------------------------------------------------------------*/

// Constructor object for Sound settings; a constructor is a blueprint that creates many objects of the same "type" (in this case, sound objects).
function sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.style.display = 'none';
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

// add sound objects using the above Constructor function
const startSound = new sound('audio/sounds/go.wav');
const displaySound = new sound('audio/sounds/bounce.wav');
const scoreSound = new sound('audio/sounds/score.wav');
scoreSound.sound.volume = 0.1;
const failSound = new sound('audio/sounds/fail.mp3');
failSound.sound.volume = 0.1;
const winSound = new sound('audio/sounds/win.wav');
const byeSound = new sound('audio/sounds/bye.wav');
const levelUpSound = new sound('audio/sounds/levelUp.wav');
const powerUpSound = new sound('audio/sounds/power-up.flac');
powerUpSound.sound.volume = 0.2;
const dangerSound = new sound('audio/sounds/danger.wav');
dangerSound.sound.volume = 0.2;
const gameOverSound = new sound('audio/sounds/gameover.wav');
const successSound = new sound('audio/sounds/success.wav');
successSound.sound.volume = 0.4;
const chargeSound = new sound('audio/sounds/power-charge.wav');
chargeSound.sound.volume = .5;
const laserSound = new sound('audio/sounds/laser.wav');
laserSound.sound.volume = 0.1;
const pingSound = new sound('audio/sounds/ping.wav');
pingSound.sound.volume = 0.025;
const music = new sound('audio/sounds/backgroundmusic.wav');
music.sound.setAttribute('loop', 'true');
music.sound.volume = 0.1;
const hardBtnSound = new sound('audio/sounds/hardbutton.wav');
const softBtnSound = new sound('audio/sounds/softbutton.wav');
hardBtnSound.sound.volume = 0.1;
softBtnSound.sound.volume = 0.1;

let currentAudioLine = pingSound;

// will play the line of audio when clicked
function playAudio(evt) {
  currentAudioLine.stop();

  //clicked "play all/entire convo" button
  if (evt.target.id == 'audio-btn-play-entire') {
    playEntireConvo();
  }

  // clicked audio for a single line
  else {

    let line = evt.target.classList[0];
    let num = parseInt(line);
    currentAudioLine.stop();
    clearTimeout(playConvoTimeout);

    for (i=0; i<conversation.audio.length; i++) {
      if (i == num) {
        currentAudioLine = conversation.audio[i];
        currentAudioLine.play();
      }
    }

  }

}

function playEntireConvo() {

  let playLoop = function () {
    currentAudioLine = conversation.audio[audioLineCounter];
    currentAudioLine.play();
    lineDuration = (currentAudioLine.sound.duration * 1000) + 500;
    audioLineCounter += 1;
    if (audioLineCounter == conversation.audio.length || (startScreen.style.display == 'none') ) {
      audioLineCounter = 0;
      return;
    }
    playConvoTimeout = setTimeout(playLoop, lineDuration);
  }

  if (audioLineCounter > 0) {
    clearTimeout(playConvoTimeout);
    currentAudioLine.stop();
    audioLineCounter = 0;
    return;
  } else {
    playLoop();
  }

}

/*-------------------------------------------------------------------
START SCREEN
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
6. PROGRAM INITILIZATION
-------------------------------------------------------------------*/

// initalizes the start screen with options to start game, instructions, view dialogue, etc. Called upon page load/refresh, and also after pressing reset button (may split into a different function later)
function init() {
  resetGame();
  window.addEventListener('keydown', handleKey);
  startScreen.style.display = 'grid';
}

// resets the game state and all starting variables to "new game"... called in the init() and reset() functions
// NOTE: bugged somewhere, doesn't appear to fully reset game
function resetGame() {
  playerTurn = 0;
  lineCounter = 0;
  audioLineCounter = 0;
  currentAudioLine = pingSound;
  lineDuration = 0;
  round = 0;
  score1 = 0;
  score2 = 0;
  player1Correct = false;
  player1Mercy = false;
  player1LinesCorrect = 0;
  player1LinesWrong = 0;
  player1ResponseTimes = [];
  player2ResponseTime = 0;
  correctButton = '';
  stop = false;
  gameOver = false;
  betweenTurns = false;
  learnMode = true; // always true
  player1Bar.classList.remove('in-trouble');

  currentAudioLine.stop();

  intervals = [energyInterval, answerTimerInterval, roundTimerInterval, roundTimeout, turnTimeout, playConvoTimeout, player2ResponseTimeout, roundModalTimeOut];
  for (i=0; i<intervals.length; i++) {
    clearInterval(intervals[i]);
    clearTimeout(intervals[i]);
  }

  announcementContainer.style.display = 'none';
  answerButtons.style.display = 'none';
  document.getElementById('select-popup').classList.remove('show');

  learnControlsWindow.style.display = 'none';
  
  const oldLines = document.getElementsByClassName('oldLine');
  while (oldLines.length > 0) {
    oldLines[0].parentNode.removeChild(oldLines[0]);
  }

  currentLine1 = document.getElementById('currentLine1');
  currentLine1.classList.remove('answering','dBoxActive');
  currentLine1.innerHTML = "";
  currentLine2 = document.getElementById('currentLine2');
  currentLine2.classList.remove('answering','dBoxActive');
  currentLine2.innerHTML = "";

  // some code I copied to clear all sounds (doesn't appear to actually work though??? maybe???)
  const sounds = document.getElementsByTagName('audio');
  for (i = 0; i < sounds.length; i++) sounds[i].pause();

}

// populate dropdown list of conversations (NOTE: will move into a different "search/filter" function in later version)
for (i = 1; i < conversationSet.length + 1; i++) {
  const convoTitle = document.createElement('p');
  convoTitle.id = 'convo' + i;
  convoTitle.addEventListener('click', changeConvo);
  const dropdownContent = document.getElementById('convo-dropdown-content');
  dropdownContent.appendChild(convoTitle);
  convoTitle.innerHTML = eval('conversation' + i + '.title'); // I probably shouldn't use "eval" (unsafe?), fix later
}

/*-------------------------------------------------------------------
7. CHOOSE A CONVERSATION
-------------------------------------------------------------------*/

// on Start Screen, change the conversation set being used in the game (default is conversation0). Takes as a parameter the menu item being clicked on from dropdown list of conversations. See the for loop above
function changeConvo(item) {
  softBtnSound.play();
  const clicked = item.target.id;
  for (i = 1; i < conversationSet.length + 1; i++) {
    if (clicked == 'convo' + i) {
      conversation = eval('conversation' + i); // I probably shouldn't use "eval" (unsafe?), fix later
    }
  }
  viewConvo();
}

// main function that displays (on Start Screen) the various conversations to be used in the game. Removes any existing grids and then creates it again to display the selected conversation
function viewConvo() {
  softBtnSound.play();

  document.getElementById('select-popup').classList.remove('show');
  currentAudioLine.stop();

  // delete/remake convoGrid
  convoGrid.parentNode.removeChild(convoGrid);
  convoGrid = document.createElement('div');
  convoGrid.id = "convoGrid";
  conversationWindow.append(convoGrid);

  // Create Title
  let title = document.createElement('h2');
  title.classList.add('convoTitle');
  convoGrid.append(title);
  title.innerHTML = conversation.title;

  // Create play entire conversation button
  let playConvoBtn = document.createElement('div');
  playConvoBtn.id = ('audio-btn-play-entire');
  playConvoBtn.classList.add('btn');
  playConvoBtn.classList.add('hover');
  playConvoBtn.classList.add('shadow');
  convoGrid.append(playConvoBtn);
  playConvoBtn.innerHTML = "Play All";
  playConvoBtn.addEventListener("click", playAudio);

  // Create conversation grid
  for (i = 0; i < conversation.lines.length; i++) {

      // create "first column" in the grid: the picture of the character speaking
      let nextCharPic = document.createElement('div');
      nextCharPic.classList.add('convoBox');
      nextCharPic.classList.add('convo-grid-img-container');
      convoGrid.appendChild(nextCharPic);

      let charPic = document.createElement('img');
      nextCharPic.appendChild(charPic);
      charPic.classList.add(`${i}-line`); // fix this later, ids should not start with numbers, can't be selected
      charPic.classList.add('convo-grid-img');

      if (i % 2 == 0) {
        charPic.src = conversation.characters.images[0];
      } else {
        charPic.src = conversation.characters.images[1];
      }

    // create "second column" in the grid: the name of the character speaking
    let nextCharName= document.createElement('div');
    nextCharName.classList.add(`${i}-line`);
    nextCharName.classList.add('convoBox');
    convoGrid.appendChild(nextCharName);
    if (i % 2 == 0) {
      nextCharName.innerHTML = conversation.characters.names[0];
    } else {
      nextCharName.innerHTML = conversation.characters.names[1];
    }

    // create "third colum": the line of dialogue in target language
    let nextDialogue = document.createElement('div');
    nextDialogue.classList.add(`line-${i}`);
    nextDialogue.classList.add('convoBox');
    nextDialogue.classList.add('convo-grid-dialogue');
    nextDialogue.classList.add('hover');
    nextDialogue.addEventListener("click", viewTranslation);
    convoGrid.appendChild(nextDialogue);
    nextDialogue.innerHTML = conversation.lines[i];

    // create "fourth column": play audio button
    let nextAudio = document.createElement('div');
    nextAudio.classList.add('convoBox');
    nextAudio.classList.add('convo-grid-audio-btn-container');
    convoGrid.appendChild(nextAudio);

    let audioButton = document.createElement('img');
    nextAudio.appendChild(audioButton);
    audioButton.classList.add(`${i}-line`);
    audioButton.classList.add('audio-btn-play-line');
    audioButton.classList.add('hover');
    audioButton.src = 'images/audio-button.png';
    audioButton.addEventListener("click", playAudio);

    // create "hidden text" row under each dialogue line (to contain the translation -- toggle open/closed)
    let nextTranslation = document.createElement('div');
    convoGrid.appendChild(nextTranslation);
    nextTranslation.classList.add(`line-${i}`);
    nextTranslation.classList.add('convo-grid-translation');
    nextTranslation.classList.add('show');
    nextTranslation.innerHTML = conversation.translations[i];

  }

}

function viewTranslation(evt) {
  let line = evt.target.classList[0];
  evt.target.classList.toggle('active');
  let translation = document.querySelector('.convo-grid-translation.' + line);

  if (translation.style.display === "block") {
    translation.style.display = "none";
  } else {
    translation.style.display = "block";
  }
}

//#endregion

/*-------------------------------------------------------------------
8. OPTIONS SCREEN AND START GAME
-------------------------------------------------------------------*/

// Click on "Learn Mode".
function newLearnMode() {

  if (conversation.id == 0 || conversation.id == undefined) {
    pingSound.play();
    document.getElementById('select-popup').classList.toggle('show');
    return;
  }

  startScreen.style.display = 'none';
  learnMode = true;
  currentAudioLine.stop();
  clearTimeout(playConvoTimeout);
  softBtnSound.play();
  learnModeChanges();
  learnModeStart();

}


/*-------------------------------------------------------------------
12. INITALIZE LEARN MODE
-------------------------------------------------------------------*/

// General changes to the game logic made in Learn Mode. Note: already disabled energy and timer in other functions
function learnModeChanges() {

  energyContainer.style.display = 'none';
  document.querySelector('#player-window-1').after(learnControlsWindow);
  learnControlsWindow.style.display = 'flex';

  //add icons to each dialogue box to hear the pronunciation and see the English translation >> incorporate into displayLastLine function. Audio plays, the English translation shows up as a "popup"

}

// this replaces the "nextRound" function in Learn Mode, since Learn Mode doesn't have rounds. Used to start (and restart) the conversation. Popup screen at start of learn mode to choose the character role you want to play.
function learnModeStart() {

  stop = true;
  currentAudioLine.stop();
  clearTimeout(turnTimeout);
  clearTimeout(player2ResponseTimeout);
  hardBtnSound.play();
  
  pauseButton.disabled = true;
  pauseButton.classList.add('frozen');
  pauseButton.classList.remove('hover');

  lineCounter = 0;

  const oldLines = document.getElementsByClassName('oldLine');
  while (oldLines.length > 0) {
    oldLines[0].parentNode.removeChild(oldLines[0]);
  }

  currentLine1 = document.getElementById('currentLine1');
  currentLine1.classList.remove('answering','dBoxActive');
  currentLine1.innerHTML = "";
  currentLine2 = document.getElementById('currentLine2');
  currentLine2.classList.remove('answering','dBoxActive');
  currentLine2.innerHTML = "";

  document.getElementById('currentLine1').scrollIntoView(true);
  document.getElementById('currentLine2').scrollIntoView(true);

  document.getElementById("dialogueTitle").innerHTML = "<b>Dialogue: </b>" + conversation.title;

  for (i = 1; i <= 4; i++) {
    document.getElementById('choice' + i).disabled = true;
    document.getElementById('choice' + i).classList.add('frozen');
    document.getElementById('choice' + i).classList.remove('hover');
  }

  document.getElementById('lmImage1').src = conversation.characters.images[0];
  document.getElementById('lmImage2').src = conversation.characters.images[1];
  document.getElementById('lmRole1').innerHTML = conversation.characters.names[0];
  document.getElementById('lmRole2').innerHTML = conversation.characters.names[1];
  document.getElementById('lmTurn1').innerHTML = 'speaks first';
  document.getElementById('lmTurn2').innerHTML = 'speaks second';

  learnModeModal.style.display = 'block';

}

// Display required "modal box" (popup window) for player to choose her role in the conversation
function chooseRole(choice) {

  hardBtnSound.play();
  learnModeModal.style.display = 'none';

  if (choice.id == 'lm-choose-1') {
    document.getElementById('role1').innerHTML = '<b>Player 1:</b> ' + conversation.characters.names[0];
    document.getElementById('role2').innerHTML = '<b>Player 2:</b> ' + conversation.characters.names[1];
    document.getElementById('playerImage1').src = conversation.characters.images[0];
    document.getElementById('playerImage2').src = conversation.characters.images[1];
    playerTurn = 1;
  }
  
  if (choice.id == 'lm-choose-2') {
    document.getElementById('role1').innerHTML = '<b>Player 1:</b> ' + conversation.characters.names[1];
    document.getElementById('role2').innerHTML = '<b>Player 2:</b> ' + conversation.characters.names[0];
    document.getElementById('playerImage1').src = conversation.characters.images[1];
    document.getElementById('playerImage2').src = conversation.characters.images[0];
    playerTurn = 2;
  }

  nextTurn();

}

/*-------------------------------------------------------------------
13. TURN LOGIC
-------------------------------------------------------------------*/

function nextTurn() {

  betweenTurns = false;
  stop = false;

  // if Player 1's turn
  if (playerTurn == 1) {
    player1Turn();
  }

  // if Player 2's turn
  else {
    player2Turn();
  }
}

function player1Turn() {

  // enable Previous/Next Line buttons during Learn Mode (doesn't work on Player 2's turn)
  document.getElementById('learnPrevious').disabled = false;
  document.getElementById('learnPrevious').classList.remove('frozen');
  document.getElementById('learnPrevious').classList.add('hover');
  document.getElementById('learnNext').disabled = false;
  document.getElementById('learnNext').classList.remove('frozen');
  document.getElementById('learnNext').classList.add('hover');
  
  displayInProgressLine(); // show "answering" placeholder animation speech bubble

  answerChoices();  // displays answer buttons/choices, allowing player to guess the next correct line

}

// What happens during Player 2's turn. Player 2 is the AI and always selects the correct next line, but there's a random delay in its response (adding an element of unpredictability)
function player2Turn() {

  displayInProgressLine(); // show "answering" placeholder animation speech bubble
  
  player2ResponseTime = 1000; // instant response in Learn Mode

  player2ResponseTimeClock = player2ResponseTime; // tracks the remaining time to respond in the event of a pause

  player2Response(); // sets in motion a response after a (random) timeout

}

function player2Response() {

  player2ResponseTimeout = setTimeout(() => {

    timerBar.style.width = 100 + "%";
    endTurn();
    
  }, player2ResponseTimeClock);

}

// Show an "answer in progress" speech bubble as an indicator placeholder box instead of the current line. Makes it clear visually whose turn it is and what they are doing. This bubble shows up for the CURRENT PLAYER
function displayInProgressLine() {

  currentLine1 = document.getElementById('currentLine1');
  currentLine2 = document.getElementById('currentLine2');

  if (playerTurn == 1) {
    currentLine1.classList.add('dBoxActive');
    currentLine1.classList.add('answering');
    let dots = document.createElement('div');
    currentLine1.appendChild(dots);
    dots.classList.add('dot-flashing');
    }


  if (playerTurn == 2) {
    currentLine2.classList.add('dBoxActive');
    currentLine2.classList.add('answering');
    let dots = document.createElement('div');
    currentLine2.appendChild(dots);
    dots.classList.add('dot-flashing');
    }

}

function displayLastLine() {

  // special exception for the first turn of the game, which has no "preceding dialogue". Don't create another line of dialogue
  if (lineCounter == 0) {
    return;
  }

  // currentLine1 is always situated in the column on the LEFT SIDE of the dialogue window, which represents player 's dialogue. currentLine 2 is situated in the columnn on the RIGHT SIDE.
  currentLine1 = document.getElementById('currentLine1');
  currentLine2 = document.getElementById('currentLine2');

  displaySound.play();

  // display the LAST PLAYER'S line (not the current player. 
  if (playerTurn == 1) {
    currentLine2.innerHTML = conversation.lines[lineCounter - 1];
    currentLine2.classList.remove('answering');
  }

  if (playerTurn == 2) {
    currentLine1.innerHTML = conversation.lines[lineCounter - 1];
    currentLine1.classList.remove('answering');
  }

  if (conversation.audio[lineCounter - 1] !== undefined) {
    currentAudioLine = conversation.audio[lineCounter - 1];
    currentAudioLine.play();
    lineDuration = conversation.audio[lineCounter - 1].sound.duration * 1000;
  } else {
    lineDuration = 1000;
  }

  // create a new row with two dialogue boxes by pushing two new div elements into the Dialogue Window grid. This new row becomes the "currentLine"
  currentLine1.removeAttribute('id');
  currentLine1.classList.add('oldLine');
  currentLine2.removeAttribute('id');
  currentLine2.classList.add('oldLine');

  const newLine1 = document.createElement('div');
  newLine1.classList.add('dialogueBox');
  newLine1.classList.add('dBox1');
  newLine1.id = 'currentLine1';
  dialogueWindow.appendChild(newLine1);

  const newLine2 = document.createElement('div');
  newLine2.classList.add('dialogueBox');
  newLine2.classList.add('dBox2');
  newLine2.id = 'currentLine2';
  dialogueWindow.appendChild(newLine2);

  currentLine1 = document.getElementById('currentLine1');
  currentLine2 = document.getElementById('currentLine2');

  currentLine1.scrollIntoView(true);
  currentLine2.scrollIntoView(true);

  return (lineDuration);

}

// End Turn function: end Player 1 or Player 2's turn and lead into nextTurn(). Update score, stats, freeze buttons.
function endTurn() {

  for (i = 1; i <= 4; i++) {
    document.getElementById('choice' + i).disabled = true;
    document.getElementById('choice' + i).classList.add('frozen');
    document.getElementById('choice' + i).classList.remove('hover');
  }

  if (playerTurn == 1) {playerTurn = 2;}
  else {playerTurn = 1;}

  lineCounter += 1;

  displayLastLine(); // show the LAST PLAYER's line in Dialogue Window, returns lineDuration (in milliseconds, how long the audio clip of the dialogue line is)

  if (lineCounter == conversation.lines.length) {
    endRound();
  }

  else {
    turnTimeout = setTimeout(nextTurn, lineDuration);
    betweenTurns = true;

    // disable Learn Mode Previous/Next Line buttons between Player 1 turns
    document.getElementById('learnPrevious').disabled = true;
    document.getElementById('learnPrevious').classList.add('frozen');
    document.getElementById('learnPrevious').classList.remove('hover');
    document.getElementById('learnNext').disabled = true;
    document.getElementById('learnNext').classList.add('frozen');
    document.getElementById('learnNext').classList.remove('hover');
      
  }

}

//End Round: clear/reset various game states, etc.
function endRound() {

  // Change line counter for rewinding. Player Turn SHOULD be 1, if not, fix counter so it matches player 1's turn
  if (playerTurn == 2) {
    playerTurn = 1;
    lineCounter -= 1;
    rewindSpecial = true;
  }

  // special condition if end of convo is reached in Learn Mode: activate previous button, but disable next button. 
  document.getElementById('learnPrevious').disabled = false;
  document.getElementById('learnPrevious').classList.remove('frozen');
  document.getElementById('learnPrevious').classList.add('hover');
  document.getElementById('learnNext').disabled = true;
  document.getElementById('learnNext').classList.add('frozen');
  document.getElementById('learnNext').classList.remove('hover');

}

/*-------------------------------------------------------------------
14. ANSWER CHOICES
-------------------------------------------------------------------*/

// Creates the interface for selecting the next correct line (for Player 1). Displays random lines of dialogue: one is correct, 3 are wrong
function answerChoices() {

  // display answer buttons
  announcementContainer.style.display = 'none';
  answerButtons.style.display = 'grid';

  // clear visual right/wrong indicators of old choices
  for (i = 1; i <= 4; i++) {
    document.getElementById('choice' + i).classList.remove('checkmark');
    document.getElementById('choice' + i).classList.remove('xmark');
    document.getElementById('choice' + i).classList.remove('frozen');
    document.getElementById('choice' + i).classList.add('hover');
    document.getElementById('choice' + i).disabled = false;
  }

  // pick one of the buttons randomly to contain correct choice
  const randomButton = Math.ceil(Math.random() * 4);
  correctButton = document.getElementById('choice' + randomButton);

  // set up variables to store the correct and wrong answer buttons (this turn). There's 1 correct button, 3 wrong buttons
  let correct = 0;
  let wrong1 = 0;
  let wrong2 = 0;
  let wrong3 = 0;

  function wrongLine1() {
    
    // Generates a random "wrong" line. For example, 6, which is "Bye, Alice!". But the wrong choice can't be same as correct choice (for example, correct = 1, wrong1 also = 1)
    wrong1 = Math.floor(Math.random() * conversation.lines.length);
    
    if (wrong1 !== lineCounter) {
      return;
    }

    //starts function over to generate valid wrong choice (lineCounter records the current line of the conversation as a number (lines in the conversation set are stored in an array, so the first line is 0, second line is 1, and so on)
    else wrongLine1();

  }

  function wrongLine2() {
    wrong2 = Math.floor(Math.random() * conversation.lines.length);
    if (wrong2 !== lineCounter && wrong2 !== wrong1) {
      return;
    }
    else wrongLine2(); 
  }

  function wrongLine3() {
    wrong3 = Math.floor(Math.random() * conversation.lines.length);
    if (wrong3 !== lineCounter && wrong3 !== wrong1 && wrong3 !== wrong2) {
      return;
    }
    else wrongLine3();
  }

  // calling the above functions (how do I call and define a function in one line?)
  wrongLine1();
  wrongLine2();
  wrongLine3();

  // So far in the function, have found random numbers which are all unique and point to specific lines via conversations.lines[i]. We also know that there is one "correctButton" (global variable) which contains the right answer. All the others are wrong. Let's now display the lines (the three wrong lines are randomly displayed)

  correctButton.innerHTML = conversation.lines[lineCounter]; 

  if (choice1 == correctButton) {
    choice2.innerHTML = conversation.lines[wrong1];
    choice3.innerHTML = conversation.lines[wrong2];
    choice4.innerHTML = conversation.lines[wrong3];
  }

  if (choice2 == correctButton) {
    choice1.innerHTML = conversation.lines[wrong1];
    choice3.innerHTML = conversation.lines[wrong2];
    choice4.innerHTML = conversation.lines[wrong3];
  }

  if (choice3 == correctButton) {
    choice1.innerHTML = conversation.lines[wrong1];
    choice2.innerHTML = conversation.lines[wrong2];
    choice4.innerHTML = conversation.lines[wrong3];
  }

  if (choice4 == correctButton) {
    choice1.innerHTML = conversation.lines[wrong1];
    choice2.innerHTML = conversation.lines[wrong2];
    choice3.innerHTML = conversation.lines[wrong3];
  }

}

// What happens when the player clicks on an answer button. Checks to see if the answer is right or wrong, then ends the turn. Takes as a parameter the specific button that was pressed (onClick event)
function answered(button) {
  softBtnSound.play();

  const clicked = button.id;

  if (clicked == correctButton.id) {
    button.classList.add('checkmark');
    scoreSound.play();
    player1Correct = true;
  } else {
    failSound.play();
    button.classList.add('xmark');
    correctButton.classList.add('checkmark');
    player1Correct = false;
  }

  endTurn();
}

// Enables hotkeys for answer buttons. Pressing numbers 1-4 on the keypad will call the answered() function, taking that respective answer choice as a parameter.
// HandleKey was added as an event listener in the Init() function. The parameter here is the key that was pressed
function handleKey(evt) {

  // hotkeys don't work if there are no answer buttons and/or the answer choices are frozen (game paused, already answered, etc.)
  if (answerButtons.style.display === 'none' || document.getElementById('choice1').disabled === true) {
    return;
  }

  hardBtnSound.play();

  if (evt.key == 1) {
    return answered(choice1);
  }

  if (evt.key == 2) {
    return answered(choice2);
  }

  if (evt.key == 3) {
    return answered(choice3);
  }

  if (evt.key == 4) {
    return answered(choice4);
  }
}

/*-------------------------------------------------------------------
LEARN MODE CONTROLS
-------------------------------------------------------------------*/

// go back to the last PLAYER 1 line (and erase the existing lines between). For now assume previousLine() is always pressed on player 1's Turn... need to freeze this button during Player 2's turn, OR add in Player 2 turn logic. 
// At some point, make it so that it truly goes back "1" line, moving between player 1 and 2.
function previousLine() {

  if ( (lineCounter <= 1) || (playerTurn == 2) || (currentAudioLine.sound.paused == false) ) return;
  hardBtnSound.play();

  lineCounter -= 2;

  // delete current lines, rewind turn logic and so on
  currentLine1.removeAttribute('id');
  currentLine1.classList.add('delete-line');
  currentLine2.removeAttribute('id');
  currentLine2.classList.add('delete-line');
  currentLine1.previousElementSibling.classList.add('delete-line');
  currentLine1.previousElementSibling.previousElementSibling.classList.add('delete-line');
  let previousLine2 = currentLine1.previousElementSibling.previousElementSibling.previousElementSibling;
  let previousLine1 = previousLine2.previousElementSibling;

  //special case for when convo is over, Player 2 answered last, and trying to rewind
  if (rewindSpecial == true) {
    previousLine2.classList.add('delete-line');
    previousLine1.classList.add('delete-line');
    previousLine2 = previousLine1.previousElementSibling;
    previousLine1 = previousLine2.previousElementSibling;
    rewindSpecial = false;
  }

  previousLine2.id = 'currentLine2';
  previousLine2.classList.remove('oldLine');
  previousLine1.id = 'currentLine1';
  previousLine1.classList.remove('oldLine','dBoxActive');
  previousLine1.innerHTML = '';

  let deleteLines = document.getElementsByClassName('delete-line');
  while (deleteLines.length > 0) {
    deleteLines[0].parentNode.removeChild(deleteLines[0]);
  }

  currentLine1.scrollIntoView(true);
  currentLine2.scrollIntoView(true);

  playerTurn = 1;

  nextTurn();
}

//Again, assume this is pressed only on Player 1's turn
function nextLine() {
  
  if ( (lineCounter >= conversation.lines.length - 2) || (playerTurn == 2) || (currentAudioLine.sound.paused == false) ) return;
  hardBtnSound.play();

  // instantly fill in text for Player 1's "old" dialogue box
  currentLine1.classList.remove('answering');
  currentLine1.innerHTML = conversation.lines[lineCounter];

  // add first new row of dialogue boxes - "newLine2" should display Player 2's response
  currentLine1.removeAttribute('id');
  currentLine1.classList.add('oldLine');
  currentLine2.removeAttribute('id');
  currentLine2.classList.add('oldLine');

  let newLine1 = document.createElement('div');
  newLine1.classList.add('dialogueBox','dBox1','oldLine');
  dialogueWindow.appendChild(newLine1);

  let newLine2 = document.createElement('div');
  newLine2.classList.add('dialogueBox','dBox2','dBoxActive','oldLine');
  newLine2.innerHTML = conversation.lines[lineCounter+1];
  dialogueWindow.appendChild(newLine2);

  // add second row of dialogue boxes - this will be the current line
  newLine1 = document.createElement('div');
  newLine1.classList.add('dialogueBox','dBox1');
  newLine1.id = 'currentLine1';
  dialogueWindow.appendChild(newLine1);

  newLine2 = document.createElement('div');
  newLine2.classList.add('dialogueBox','dBox2');
  newLine2.id = 'currentLine2';
  dialogueWindow.appendChild(newLine2);

  currentLine1 = document.getElementById('currentLine1');
  currentLine2 = document.getElementById('currentLine2');
  currentLine1.scrollIntoView(true);
  currentLine2.scrollIntoView(true);

  lineCounter += 2;
  playerTurn = 1;

  nextTurn();

}


//maybe add a function to break down a line into individual words/phrases. For example, incorporating a dictionary API into Learn Mode >>> what was the one I saw at ACTFL ??? Mouse over the words to see them translated and defined


/*-------------------------------------------------------------------
GAME OVER AND PAUSE
-------------------------------------------------------------------*/

// makes a new game when New Game button is pressed. Goes back to Start Screen, resets everything
function restart() {
  softBtnSound.play();
  init();
}



// after the entire script is loaded by browser, call init() function to create Start Screen
window.addEventListener('load', init);




