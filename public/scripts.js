// let speech = '';

// //playing around with Google's text-to-speech API
// function textToSpeech() {

//   const outputFile =`speech-4.mp3`;

//   speech = new sound(outputFile);

//   speech.play();

// }


//#region Code Layout


/*-------------------------------------------------------------------

THIS JAVASCRIPT FILE IS DIVIDED INTO SEVERAL DIFFERENT SECTIONS (i.e. de facto modules) as follows. Each section corresponds to a major game functionality: 

>> GAME SETUP:

1. Conversation Sets (hard-coded dataset)

2. Game Variables

3. Game Objects

4. Modal Windows

5. Sounds

>> START SCREEN

6. Program Initalization

7. Choose a Conversation

8. Start Game

>> GAME VALUES AND ANIMATIONS

9. Energy Bar
 
10. Answer Timer Bar

>> GAME TURNS

12. Initalize New Round

13. Turn Logic

14. Answer Choices

>> GAME OVER AND PAUSE

15. Game Over

16. Game Pause

>> GAME MODES

17. LEARN MODE

-------------------------------------------------------------------*/
//#endregion

//#region a bunch of crap I don't want to think about right now

/*-------------------------------------------------------------------
GAME SETUP
-------------------------------------------------------------------*/

// the current conversation variable
let conversation = {};

let conversationSet = data;

// create array collecting all conversations
// const conversationSet = conversation_list;

/*-------------------------------------------------------------------
2. GAME VARIABLES
-------------------------------------------------------------------*/

// Set up global variables that will be used in multiple subsequent functions


// get major elements/sections of the page
const startScreen = document.getElementById('startScreen');
const optionsScreen = document.getElementById('optionsScreen');
let convoGrid = document.getElementById('convoGrid');
const energyWindow = document.getElementById('energyWindow');
const announcementBox = document.getElementById('announcementBox');

const player1Bar = document.getElementById('player1Bar');
const player2Bar = document.getElementById('player2Bar');
const energyCounter1 = document.getElementById('energyCounter1');
const energyCounter2 = document.getElementById('energyCounter2');

const score1Counter = document.getElementById('score1Counter');
const score2Counter = document.getElementById('score2Counter');

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
let learnMode = false;
let energyContainer = document.getElementById('energyContainer');
let learnControlsWindow = document.getElementById('learnControlsWindow');
let rewindSpecial = false;

//#endregion

/*-------------------------------------------------------------------
3. GAME OBJECTS
-------------------------------------------------------------------*/

// constructor function for Energy (Player 1 and 2)
class Energy {
  constructor() {
    this.amt = 50;
    this.vel = 1; // velocity per second. Energy ticks every .2 seconds, so it's divided by 5 for each tick; 1/5 = .2 energy/sec
    this.maxVel = 1;
  }
  change() {
    if (stop == true) {return};
    this.amt = this.amt + this.vel/5; 
  }
  reduce() {
    this.vel /= 5;
    if (this.vel > 1 && this.vel > 0) this.vel = 1; 
    if (this.vel < -1) this.vel = -1; 
  }
  restore() {
    this.vel = this.maxVel;
  }
  level() {
    let formula = 1 + (round - 1) * .5;
    if (round > 3 && round <=6) formula *= 1.5;
    if (round > 6 && round < 9) formula *= 2;
    if (round >= 9) formula *= 3;
    if (this.vel > 0) {this.vel = formula};
    if (this.vel < 0) {this.vel = formula * -1};
    this.maxVel = this.vel;
  }
  reset() {
    this.amt = 50;
    this.vel = 1;
    this.maxVel = 1;
    clearInterval(energyInterval);
  }
}

const energy1 = new Energy();
const energy2 = new Energy();

// Object: Timer Bar (in controls window)
const timer = {
  maxSeconds: 20,
  seconds: this.maxSeconds,
  change() {
    if (stop == true) {return};
    this.seconds -= .2; // Timer ticks every .2 seconds, so a default change of 1 second/second = 1/5 = .2 seconds per tick
  },
  reset() {
    this.seconds = this.maxSeconds;
    clearInterval(answerTimerInterval);
  },
};

//#region more crap

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
  optionsScreen.style.display = 'none';
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
  learnMode = false;
  player1Bar.classList.remove('in-trouble');

  energy1.reset();
  energy2.reset();
  timer.reset();
  score1Counter.innerHTML = 'Score: ' + score1;
  score2Counter.innerHTML = 'Score: ' + score2;
  roundModal.style.display = 'none';

  currentAudioLine.stop();

  intervals = [energyInterval, answerTimerInterval, roundTimerInterval, roundTimeout, turnTimeout, playConvoTimeout, player2ResponseTimeout, roundModalTimeOut];
  for (i=0; i<intervals.length; i++) {
    clearInterval(intervals[i]);
    clearTimeout(intervals[i]);
  }

  announcementContainer.style.display = 'none';
  answerButtons.style.display = 'none';
  document.getElementById('select-popup').classList.remove('show');

  //turn off Learn mode
  energyContainer.style.display = 'flex';
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

  document.getElementById('rmImage').src = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
  document.getElementById('playerImage1').src = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
  document.getElementById('playerImage2').src = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  // hmm, should I "reset" the conversation or difficulty, or not? Maybe not...
  // conversation = conversation0;
  // difficulty = 2;
  // convoGrid.style.display = 'none';

}

// populate dropdown list of conversations (NOTE: will move into a different "search/filter" function in later version)
for (i = 1; i < conversationSet.length + 1; i++) {
  const convoTitle = document.createElement('p');
  convoTitle.id = 'convo' + i;
  convoTitle.addEventListener('click', changeConvo);
  const dropdownContent = document.getElementById('convo-dropdown-content');
  dropdownContent.appendChild(convoTitle);
  convoTitle.innerHTML = conversationSet[i].title; // I probably shouldn't use "eval" (unsafe?), fix later
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
      conversation = conversationSet[i]; // I probably shouldn't use "eval" (unsafe?), fix later
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

// // After clicking on play button on the start screen, go to options/setting screen. Must select a conversation first, otherwise a popup message is shown
function options() {
  if (conversation._id == undefined) {
    pingSound.play();
    document.getElementById('select-popup').classList.toggle('show');
    return;
  }

  startScreen.style.display = 'none';
  currentAudioLine.stop();
  clearTimeout(playConvoTimeout);
  softBtnSound.play();
  optionsScreen.style.display = 'grid';

  // create dialogue title:
  let dialogueTitle = document.getElementById('options-convo-title');
  dialogueTitle.innerHTML = conversation.title;
}

// On options screen, choose a difficulty:
function chooseDifficulty(item) {
  softBtnSound.play();
  let clicked = item.id;
  let text = document.getElementById('difficulty-selected-text');
  if (clicked == 'easy-difficulty') {
    text.innerHTML = "EASY";
    difficulty = 1;
  }
  if (clicked == 'normal-difficulty') {
    text.innerHTML = "NORMAL";
    difficulty = 2;
  }
  if (clicked == 'hard-difficulty') {
    text.innerHTML = "HARD";
    difficulty = 3;
  }
}

// Click on "Learn Mode". In future, will move this mode off to a seperate page served by different script
function newLearnMode() {

  learnMode = true;
  optionsScreen.style.display = 'none';
  softBtnSound.play();
  learnModeChanges();
  learnModeStart();

}

// Click on "Game Mode"
function newGame() {

  optionsScreen.style.display = 'none';
  softBtnSound.play();
  if (difficulty == 1) round = 0; // will start at 0+1 = Round 1
  if (difficulty == 2) round = 3; // will start at 3+1 = Round 4
  if (difficulty == 3) round = 6; // will start at 6+1 = Round 7
  nextRound();

}


/*-------------------------------------------------------------------
GAME VALUES AND ANIMATIONS
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
9. ENERGY BAR
-------------------------------------------------------------------*/

// energy function that changes the values and display of the energy bars, started by nextRound()

function energy() {

  if (learnMode === true) {
    return;
  }

  energyInterval = setInterval(energyChange, 200);
}

function energyChange() {

  // update energy bar lengths (use CSS transition to make it look smooth)
  player1Bar.style.width = energy1.amt + "%";
  player2Bar.style.width = energy2.amt + "%";

  // increase or change energy
  energy1.change();
  energy2.change();

  // display energy counters
  energyCounter1.innerHTML = 'Energy: ' + Math.round(energy1.amt); // round to nearest integer
  energyCounter2.innerHTML = 'Energy: ' + Math.round(energy2.amt);

  // energy sounds warnings
  if (energy1.amt <= 20 && warning == false) {
    dangerSound.play();
    warning = true;
  }

  if (energy1.amt >= 80 && warning == false) {
    powerUpSound.play();
    warning = true;
  }

  if (energy1.amt >= 20 && energy1.amt <= 80) {
    warning = false;
  }

  // collision: if energy of either player reaches 100% (visible as the "side walls" of the bar at either side), determines winner;
  if (energy1.amt <= 0 || energy1.amt >= 100) {
    endGame();
  }

}

// flips energy flow. Used when a player answers, either correctly or incorrectly
function flip() {
  laserSound.play();
  energy1.vel = -energy1.vel;
  energy2.vel = -energy2.vel;
  energy1.maxVel = -energy1.maxVel;
  energy2.maxVel = -energy2.maxVel;
}

/*-------------------------------------------------------------------
10. ANSWER TIMER BAR
-------------------------------------------------------------------*/

function answerTimer() {

  if (learnMode === true) {
    return;
  }
    answerTimerInterval = setInterval(timerChange, 200);
}

function timerChange() {

  timer.width = (timer.seconds/timer.maxSeconds) * 100; // percentage width of the timer bar, starts at 100 (6/6), ends at 0 (0/6)
  timerBar.style.width = timer.width + "%";

  // decrease time (.25 seconds per tick, 1 second/second)
  timer.change();

  // if timer expires, clear it and end the turn. This will only EVER happen for Player 1 as Player 2 always answers within the timer limit
  if (timer.seconds < 0) {
    failSound.play();
    player1Correct = false;
    answerButtons.style.display = 'none';
    announcementContainer.style.display = 'flex';
    announcementBox.innerHTML = "SORRY, TIME'S UP!";
    endTurn();
  }

}

/*-------------------------------------------------------------------
GAME TURNS
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
12. INITALIZE NEW ROUND
-------------------------------------------------------------------*/

// Note: Things like rounds, scoring, timers, etc. are preserved between rounds of a game. Everything else is reset

function nextRound() {

  pauseButton.disabled = true;
  pauseButton.classList.add('frozen');
  pauseButton.classList.remove('hover');

  startSound.play();
  successSound.play();

  stop = false;
  lineCounter = 0;

  const oldLines = document.getElementsByClassName('oldLine');
  while (oldLines.length > 0) {
    oldLines[0].parentNode.removeChild(oldLines[0]);
  }

  document.getElementById("dialogueTitle").innerHTML = "<b>Dialogue: </b>" + conversation.title;

  document.getElementById('currentLine1').scrollIntoView(true);
  document.getElementById('currentLine2').scrollIntoView(true);

  round += 1;

  // visually reset energy smoothly
  player1Bar.style.width = 50 + "%";
  player1Bar.classList.add('smooth-transition');
  player2Bar.style.width = 50 + "%";
  player2Bar.classList.add('smooth-transition');
  energyCounter1.innerHTML = 'Energy: ' + Math.round(energy1.amt);
  energyCounter2.innerHTML = 'Energy: ' + Math.round(energy2.amt);

  // visually reset timer smoothly
  timer.width = 100;
  timerBar.style.width = timer.width + "%";
  timerBar.classList.add('smooth-transition');
  timerBar.style.display = 'block';

  let roundCounter = document.getElementById('roundCounter');
  roundCounter.innerHTML = '<b>Round: </b>' + round;

  // Randomize Player roles and who goes first: "0" (even lines) is Character 1 (for example, Bob), while "1" (odd lines) is Character 2 (for exmaple, Alice). Bob always speaks first in the dialogue, so whoever is Bob will go first
  const playerRole1 = Math.floor(Math.random() * 2);
  if (playerRole1 == 0) {
    document.getElementById('role1').innerHTML = '<b>Player 1:</b> ' + conversation.characters.names[0];
    document.getElementById('role2').innerHTML = '<b>Player 2:</b> ' + conversation.characters.names[1];
    document.getElementById('rmImage').src = conversation.characters.images[0];
    document.getElementById('rmRole').innerHTML = 'You are... ' + conversation.characters.names[0] + '!';
    document.getElementById('rmTurn').innerHTML = 'You speak... FIRST!';
    document.getElementById('playerImage1').src = conversation.characters.images[0];
    document.getElementById('playerImage2').src = conversation.characters.images[1];
    playerTurn = 1;
    energy1.vel = -energy1.vel;
  } else {
    document.getElementById('role1').innerHTML = '<b>Player 1:</b> ' + conversation.characters.names[1];
    document.getElementById('role2').innerHTML = '<b>Player 2:</b> ' + conversation.characters.names[0];
    document.getElementById('rmImage').src = conversation.characters.images[1];
    document.getElementById('rmRole').innerHTML = 'You are... ' + conversation.characters.names[1] + '!';
    document.getElementById('rmTurn').innerHTML = 'You speak... SECOND!';
    document.getElementById('playerImage1').src = conversation.characters.images[1];
    document.getElementById('playerImage2').src = conversation.characters.images[0];
    playerTurn = 2;
    energy2.vel = -energy2.vel;
  }

  // increase energy gain/loss per Round
  energy1.level();
  energy2.level();

  // Display "modal box" (popup window) to set context for conversation: the player roles, who goes first, etc.
  roundModalTimeOut = setTimeout(() => {
    roundModal.style.display = 'block';    
  }, 1000);

  // Countdown timer (5 second delay between rounds).
  let roundTimer = 5;
  roundTimerInterval = setInterval(() => {
    roundTimer -= 1;
    announcementContainer.style.display = 'flex';
    announcementBox.innerHTML = "NEXT ROUND IN " + roundTimer + " SECONDS!";
    if (roundTimer == 1) {
      roundModal.style.display = 'none';
    }
    if (roundTimer <= 0) {
      clearInterval(roundTimerInterval);
      announcementContainer.style.display = 'none';
      music.play();
      player1Bar.classList.remove('smooth-transition');
      player2Bar.classList.remove('smooth-transition');
      timerBar.classList.remove('smooth-transition');
      energy();
      nextTurn();
      }
  }, 1000);

}

/*-------------------------------------------------------------------
13. TURN LOGIC
-------------------------------------------------------------------*/

// nextTurn() function is called upon several conditions. First, newGame() that starts the game/a new round. Second, during Player 1's turn (the human), if the player either clicks on an answer button or the answer timer runs out. Third, during Player 2's turn, the nextTurn is called after a random delay of a few seconds.
function nextTurn() {

  betweenTurns = false;
  stop = false;

  if ( (learnMode == false) && (round < 6) ) { // disable pause during Learn Mode and hard difficulty
    pauseButton.disabled = false;
    pauseButton.classList.remove('frozen');
    pauseButton.classList.add('hover');
  }

  player1Bar.classList.remove('frozen');
  player2Bar.classList.remove('frozen');
  if (lineCounter != 0) {
    energy1.restore();
    energy2.restore();
  }

  // if Player 1's turn
  if (playerTurn == 1) {
    player1Turn();
  }

  // if Player 2's turn
  else {
    player2Turn();
  }
}

// What happens during Player 1's turn. Player 1 is the human playing the game
function player1Turn() {

  // enable Previous/Next Line buttons during Learn Mode (doesn't work on Player 2's turn)
  document.getElementById('learnPrevious').disabled = false;
  document.getElementById('learnPrevious').classList.remove('frozen');
  document.getElementById('learnPrevious').classList.add('hover');
  document.getElementById('learnNext').disabled = false;
  document.getElementById('learnNext').classList.remove('frozen');
  document.getElementById('learnNext').classList.add('hover');

  if (learnMode == false) timerBar.style.display = 'block'; // disable timer during learn mode
  answerTimer(); // call the timer function
  
  displayInProgressLine(); // show "answering" placeholder animation speech bubble

  answerChoices();  // displays answer buttons/choices, allowing player to guess the next correct line

}

// What happens during Player 2's turn. Player 2 is the AI and always selects the correct next line, but there's a random delay in its response (adding an element of unpredictability)
function player2Turn() {

  // don't severely punish players if they get the answer wrong--reduce energy loss on Player 2's turn. (But still losing it.)
  if (player1Mercy == true) {
      energy1.reduce(); 
      energy2.reduce();
      player1Bar.classList.add('in-trouble');
  };

  timerBar.style.display = 'none'; // hide timer on Player 2's turn
  answerTimer();  // call the timer function

  displayInProgressLine();  // show "answering" placeholder animation speech bubble

  // set random response time before Player 2 (the AI) responds

  // Round 1-3 is EASY MODE, if the player is competent has a very good chance of winning in these rounds. Player 2 responds slowly Will build in different difficulty settings later
  if (round <= 3) {
    player2ResponseTime = Math.random() * 6000 + 3000;
  }

  // Round 4-6 is NORMAL MODE. Can be challenging, even for a competent "normal" player. Player 2 responds fast. Dangerous to make any mistakes and need to respond fast. 
  if (round > 3 && round <= 6) {
    player2ResponseTime = Math.random() * 4000 + 2000;
  }

  // Round 7+ is HARD MODE. Very challenging, Player 2 responds almost instantly, you have to be extremely fast and never make any mistakes (like, response times under 2 seconds on average).
  if (round > 6) {
    player2ResponseTime = Math.random() * 2000 + 1000;
  }

  if (learnMode == true) player2ResponseTime = 1000; // instant response in Learn Mode

  player2ResponseTimeClock = player2ResponseTime; // tracks the remaining time to respond in the event of a pause

  player2Response(); // sets in motion a response after a (random) timeout

}

function player2Response() {

  player2ResponseTimeout = setTimeout(() => {
    
    if (learnMode == false) answerButtons.style.display = 'none'; // don't hide answer buttons during Learn Mode

    if (energy2.vel < 0) {
      flip();
    }

    if ( player1Mercy == true ) {
      energy1.restore();  // restore energy to normal at end of player 2's response -- important so it's not reduced twice
      energy2.restore();
      player1Mercy = false;
      player1Bar.classList.remove('in-trouble');
    }

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

// displayLastLine() is a function that displays new lines of the conversation in the dialogue window, in the format of a texting conversation. Upon the "next turn", the previous turn's dialogue is displayed. So if the current playerTurn = 2, we're actually displaying player 1's lines. (The current line is HIDDEN during the player turn--after all, the player has to choose the correct line, so it can't be visible during his turn.)
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

  // the time that's passed since the start of the turn, in seconds. Push to array that stores each line's response time
  elapsedTime = timer.maxSeconds - timer.seconds;

  scoreTurn();

  if (playerTurn == 1) {
    player1ResponseTimes.push(elapsedTime);

    if (player1Correct == true) {
      player1LinesCorrect += 1;
    } else {
      player1LinesWrong += 1;
      player1Mercy = true;
    }

    playerTurn = 2;
  }

  else {
    playerTurn = 1;
  }

  player1Correct = false;
  lineCounter += 1;
  elapsedTime = 0;
  timer.reset();

  displayLastLine(); // show the LAST PLAYER's line in Dialogue Window, returns lineDuration (in milliseconds, how long the audio clip of the dialogue line is)

  if (gameOver == true) {
    endGame();
  }

  else if (lineCounter == conversation.lines.length) {
    endRound();
  }

  else {
    turnTimeout = setTimeout(nextTurn, lineDuration);
    betweenTurns = true;
    stop = true;  // energy/timers stopped while the audio plays (can't answer until it's finished)
    player1Bar.classList.add('frozen');
    player2Bar.classList.add('frozen');

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

  if ( learnMode == true) {

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

    return;
  } 

  stop = true;

  energy1.reset();
  energy2.reset();
  timer.reset();

  music.stop();
  levelUpSound.play();
  chargeSound.play();

  clearTimeout(turnTimeout);

  answerButtons.style.display = 'none';
  announcementContainer.style.display = 'flex';
  announcementBox.innerHTML = "ROUND OVER!";  

  pauseButton.disabled = true;
  pauseButton.classList.add('frozen');
  pauseButton.classList.remove('hover');

  scoreRound();

  roundTimeout = setTimeout(nextRound, 3000);

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
    flip();
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
SCORING AND BALANCE
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
15. SCORING
-------------------------------------------------------------------*/

// Score function called at the end of each turn
function scoreTurn() {

  if (learnMode == true ) return;

  let formula = 200 + round * 50 - Math.round(elapsedTime * 20)

  if (playerTurn == 1) {
    // Easy Mode (Round 1-3): regular scoring
    if (round <= 3) {
      if (player1Correct == true) {score1 += formula} else { score1 -= formula};
    };

    //Normal Mode (Round 4-6): all scores quadrupled
    if (round > 3 && round < 6) {
      formula *= 4;
      if (player1Correct == true) {score1 += formula} else { score1 -= formula};
    };

    //Hard Mode (Round 7+): all scores x8
    if (round > 6) {
      formula *= 8;
      if (player1Correct == true) {score1 += formula} else { score1 -= formula};
    }
  }

  if (playerTurn == 2) {
    // Easy Mode (Round 1-3): regular scoring
    if (round <= 3) {
      score2 += formula - 100;
    };

    //Normal Mode (Round 4-6): all scores quadrupled
    if (round > 3 && round < 6) {
      formula *= 4;
      score2 += formula - 500;
    };

    //Hard Mode (Round 7+): all scores x8
    if (round > 6) {
      formula *= 8;
      score2 += formula - 1000;
    }
  }

  score1Counter.innerHTML = 'Score: ' + score1;
  score2Counter.innerHTML = 'Score: ' + score2;

}

// Score function called end of each round
function scoreRound() {

  if (learnMode == true ) return;

  let bonus = 1000 * round;

  if (round > 3 && round < 6) {bonus *= 4;}
  if (round > 6) {bonus *= 8;}

  if (energy1.amt > energy2.amt) {score1 += bonus};
  if (energy2.amt > energy1.amt) {score += bonus};

  score1Counter.innerHTML = 'Score: ' + score1;
  score2Counter.innerHTML = 'Score: ' + score2;

}

// Score function called end of game
function scoreGame() {

  if (learnMode == true) return;

  let bonus = Math.round(1000 * round + 100 / energy1.vel + 5000 / averageTime - 1000 * player1LinesWrong);
  
  if (round > 3 && round <= 6) {bonus *= 4};
  if (round > 6) {bonus *= 8};

  // Player 2 wins
  if (energy1.amt <= 0) {
    bonus = 0;
  }

  score1 = Math.round(score1 + bonus);

  document.getElementById('endBonus').innerHTML = 'BONUS POINTS: ' + bonus;
  document.getElementById('endScore').innerHTML = 'TOTAL SCORE: ' + score1;

  score1Counter.innerHTML = 'Score: ' + score1;
  score2Counter.innerHTML = 'Score: ' + score2;

}

/*-------------------------------------------------------------------
GAME OVER AND PAUSE
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
16. GAME OVER
-------------------------------------------------------------------*/

// "game over" function Called when game is over
// Besides determining the winner, also calculates various stats for the game to be displaed on the Game End Screen, like total score, bonuses, average timer to answer, etc.
function endGame() {

  pauseButton.disabled = true;
  pauseButton.classList.add('frozen');
  pauseButton.classList.remove('hover');
  music.stop();
  stop = true;
  gameOver = true;
  answerButtons.style.display = 'none';
  announcementContainer.style.display = 'none';
  clearInterval(energyInterval);
  clearInterval(answerTimerInterval);
  clearTimeout(player2ResponseTimeout);
  clearTimeout(turnTimeout);

  // need to do something to set energy for each player to exactly 0 or 100, and display that
  if (energy1.amt < 0) {
    player1Bar.style.width = 0 + "%";
    player2Bar.style.width = 100 + "%";
    energyCounter1.innerHTML = 'Energy: ' + 0;
    energyCounter2.innerHTML = 'Energy: ' + 100;
  }

  if (energy1.amt > 100) {
    player1Bar.style.width = 100 + "%";
    player2Bar.style.width = 0 + "%";
    energyCounter1.innerHTML = 'Energy: ' + 100;
    energyCounter2.innerHTML = 'Energy: ' + 0;
  }

  // Player 1 wins
  if (energy1.amt >= 100) {
    winSound.play();
    document.getElementById('endMessage').innerHTML = 'CONGRATULATIONS, YOU WIN!';
  }

  // Player 2 wins
  if (energy1.amt <= 0) {
    gameOverSound.play();
    document.getElementById('endMessage').innerHTML = 'SORRY, YOU LOST!';
  }

  document.getElementById('gameOverModal').style.display = 'block';

  averageTime = 0;
  let total = 0;
  for (i = 0; i < player1ResponseTimes.length; i++) {
    total += player1ResponseTimes[i];
  }
  averageTime = Math.round((total / player1ResponseTimes.length) * 100) / 100;

  scoreGame();

  const lineStats = document.getElementById('lineStats');
  lineStats.innerHTML = `${player1LinesCorrect} lines right, ${  player1LinesWrong} lines wrong`;
  const timeStats = document.getElementById('timeStats');
  timeStats.innerHTML = 'Average Response Time: ' + averageTime + ' seconds';
}

// makes a new game when New Game button is pressed. Goes back to Start Screen, resets everything
function restart() {
  softBtnSound.play();
  if ( round > 0 == true && learnMode == false) byeSound.play();
  init();
}

/*-------------------------------------------------------------------
16. GAME PAUSE
-------------------------------------------------------------------*/

// Pauses game. Still doesn't work right -- screwing something up badly, especially if you press it multiple times or rapidly...
function pause() {

  softBtnSound.play();
  pingSound.play();

  if (stop == false) {
    for (i = 1; i <= 4; i++) {
      document.getElementById('choice' + i).disabled = true;
      document.getElementById('choice' + i).classList.add('frozen');
      document.getElementById('choice' + i).classList.remove('hover');
    }
    stop = true;
    clearTimeout(player2ResponseTimeout);
    clearTimeout(turnTimeout);
    music.stop();
  } 

  else {
    stop = false;
    music.play();
    //for the case where 
    if (betweenTurns == true) nextTurn(); // if game paused during a turn Timeout between the endTurn() and nextTurn() functions

    else if (playerTurn == 1) {
      for (i = 1; i <= 4; i++) {
        document.getElementById('choice' + i).disabled = false;
        document.getElementById('choice' + i).classList.remove('frozen');
        document.getElementById('choice' + i).classList.add('hover');
      }

    } else {
      player2ResponseTimeClock -= (timer.maxSeconds - timer.seconds) * 1000; // because original timeout was cleared, reduce remaining Player 2 response time
      player2Response();
    }

  }

}


/*-------------------------------------------------------------------
GAME MODES
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
18. LEARN MODE
-------------------------------------------------------------------*/

// General changes to the game logic made in Learn Mode. Note: already disabled energy and timer in other functions
function learnModeChanges() {

  // disable pause button
  pauseButton.disabled = true;
  pauseButton.classList.add('frozen');

  // HIDE energy, timer bars, and scores
  timerBar.style.display = 'none';
  score1Counter.innerHTML = '';
  score2Counter.innerHTML = '';
  energyContainer.style.display = 'none';


  // replace energy container with buttons to rewind dialogue, skip dialogue, fastforward etc.
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
    document.getElementById('rmImage').src = conversation.characters.images[1];
    document.getElementById('rmRole').innerHTML = 'You are... ' + conversation.characters.names[1] + '!';
    document.getElementById('rmTurn').innerHTML = 'You speak... SECOND!';
    document.getElementById('playerImage1').src = conversation.characters.images[1];
    document.getElementById('playerImage2').src = conversation.characters.images[0];
    playerTurn = 2;
  }

  nextTurn();

}

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


// after the entire script is loaded by browser, call init() function to create Start Screen
window.addEventListener('load', init);
