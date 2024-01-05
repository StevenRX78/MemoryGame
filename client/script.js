const imageArray = [
  { found: false, img: "./images/Hieroglyphs/1.png" },
  { found: false, img: "./images/Hieroglyphs/2.png" },
  { found: false, img: "./images/Hieroglyphs/3.png" },
  { found: false, img: "./images/Hieroglyphs/4.png" },
  { found: false, img: "./images/Hieroglyphs/5.png" },
  { found: false, img: "./images/Hieroglyphs/6.png" },
  { found: false, img: "./images/Hieroglyphs/7.png" },
  { found: false, img: "./images/Hieroglyphs/8.png" },
];

const numOfHieros = 8;
const numOfCells = 16;
const pauseTime = 500; // for matching pause

const blank = "./images/Hieroglyphs/blank.png";
let currentTurn = []; // heiroglyph codes
let cellIDVals = []; // co-ordinates [0...15]
let gameArray = []; // id's 0...15, contains heiro's
let piecesFound = []; // The hiero id of the pieces found are in this array
let validTurn = true;
let elapsed = 0;
let start = getCurrentTime();
let username = null;

const leader = document.getElementById("leader");
let cells = document.querySelectorAll(".box");

let hideButton = document.getElementById("alertBox");
hideButton.addEventListener("click", function (event) {
  document.getElementById("alertBox").style.visibility = "hidden";
  initialise();
});

// This will also need triggering by a game reset button to restart the game.
//
// initialise();

let startButton = document.getElementById("start");
startButton.addEventListener("click", function (event) {
  document.getElementById("alertBox").style.visibility = "hidden";
  initialise();
});

let user = document.getElementById("name");
user.addEventListener("submit", function (event) {
  event.preventDefault();
  username = event.target.user.value;
});

// Set up the timer
let timer = setInterval(function () {
  let now = getCurrentTime();
  elapsed = getSecondsFromDifference(now - start);
  outputTextByElementID(elapsed, "result");
}, 1000);

function initialise() {
  currentTurn = []; // heiroglyph codes
  cellIDVals = []; // co-ordinates [0...15]
  gameArray = []; // id's 0...15, contains heiro's
  piecesFound = []; // The hiero id of the pieces found are in this array
  validTurn = true;
  elapsed = 0;

  start = getCurrentTime();
  // recreate the 16 ".box" elements in DOM to reset event listeners
  // then :  cells = document.querySelectorAll('.box');
  generateTilesInMainGameArray();
  drawBlankBoard();
  setCellEventListeners();
}

// Set up event listeners for each cell
function setCellEventListeners() {
  for (let count = 0; count < numOfCells; count++) {
    cells[count].addEventListener("click", function () {
      //Passing cellID value to game loop via cell buttons:
      gameLoop(count);
    });
  }
}

function gameLoop(cellID) {
  let valid = updateTurn(cellID); // detects illegal moves
  if (valid) drawSinglePiece(cellID);
  if (valid) checkPiecesChosen(); // if there is a match, turn over the pieces
  if (valid) checkForEndOfGame(piecesFound);
}

// push Hieroglyph id into an array (not the cell id number)
function updateTurn(value) {
  // Only if the cell button id has NOT been clicked before in this turn.
  // Prevents cheating by someone clicking the same button twice.
  validTurn = true;

  if (!currentTurn.includes(value)) {
    currentTurn.push(gameArray[value]);
    cellIDVals.push(value);
  } else {
    validTurn = false;
    resetTurn();
  }

  return validTurn;
}

// Used for when a cell has been clicked
function drawSinglePiece(value) {
  let path = gameArray[value];
  let prevWidth = cells[value].style.width;
  cells[value].style.width = "0px";
  setTimeout(function () {
    cells[value].style.width = prevWidth;
    cells[value].style.backgroundImage = `url(${imageArray[path].img})`;
  }, 200);
}

// We can't immediately switch the tiles back to blank when there is no match,
// so we need to force this pause.
function afterASetPeriodTurnPiecesBack(cellIDsChosen) {
  setTimeout(function () {
    cells[cellIDsChosen[0]].style.backgroundImage = `url(${blank})`;
    cells[cellIDsChosen[1]].style.backgroundImage = `url(${blank})`;
  }, pauseTime);
}

function checkPiecesChosen() {
  if (currentTurn.length === 2) {
    if (currentTurn[0] !== currentTurn[1]) {
      // NOT a match
      afterASetPeriodTurnPiecesBack(cellIDVals); // flip pieces back as no match found
    }

    if (
      currentTurn[0] === currentTurn[1] &&
      !piecesFound.includes(currentTurn[0])
    ) {
      // A successful match
      markPieceAsFound(currentTurn[0]);
      piecesFound.push(currentTurn[0]);
      unlockFoundTiles();
    }

    resetTurn();
  }

  // Don't do anything if currentTurn.length < 2 as it is only the first go of
  // the first turn.
}

function outputTextByElementID(value, idName) {
  document.getElementById(idName).innerText = `${value}s`;
}

// marks one instance of Hieroglyph id in imageArray to mark as found
function markPieceAsFound(value) {
  if (!piecesFound.includes(value)) {
    // This is for NOT found
    imageArray[value].found = true;
  }
}

// Write the hiero image to the two background URL's:
function unlockFoundTiles() {
  let path = "";

  for (let count = 0; count < 2; count++) {
    path = gameArray[cellIDVals[count]];
    cells[cellIDVals[count]].style.filter = "brightness(60%)";
    // setTimeout(function () {
    //   cells[
    //     cellIDVals[count]
    //   ].style.backgroundImage = `url(${imageArray[path].img})`;
    // }, 400);
  }
}

function getCurrentTime() {
  return new Date().getTime();
}

function getSecondsFromDifference(value) {
  if (value === 0) return 0;
  let minutes = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((value % (1000 * 60)) / 1000);
  return seconds + minutes * 60;
}

// Write the hiero id's to the main game array:
function generateTilesInMainGameArray() {
  for (let mainCount = 0; mainCount <= 1; mainCount++) {
    for (let count = 0; count < numOfHieros; count++) {
      gameArray.push(count);
    }
  }
  gameArray = shuffle(gameArray);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  // array = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
  return array;
}

function drawBlankBoard() {
  for (let count = 0; count < numOfCells; count++) {
    cells[count].style.backgroundImage = `url(${blank})`;
    cells[count].style.filter = "brightness(100%)";
  }
}

function resetTurn() {
  currentTurn = [];
  cellIDVals = [];
}

// This is the exit point.
function checkForEndOfGame(arr) {
  if (arr.length === numOfHieros) {
    let now = getCurrentTime();

    document.getElementById("alertBox").style.visibility = "visible"; // Needs a pop up modal instead of an alert

    if (!username) {
      username = "N/A";
    }
    const returnObj = {
      name: username,
      score: getSecondsFromDifference(now - start),
    };
    sendData(returnObj);

    console.log(JSON.stringify(returnObj));
    // Needs some async await milarkey to send the stringified object
    // to the server.
    console.log(imageArray);
  }
}

function troubleShoot() {
  console.log("Current Turns (length): " + currentTurn.length);
  console.log("Game array :" + gameArray);
  console.log("Cell Id Values: " + cellIDVals);
  console.log("Hiero's found so far: " + piecesFound);
  console.log("**********************");
}

async function sendData(data) {
  await fetch("http://localhost:8080/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `${JSON.stringify(data)}`,
  });
}

async function retrieveHighscore() {
  let highScore = document.getElementById("hi-result");
  const scores = await fetch("http://localhost:8080/leaderboard");
  const json = await scores.json();
  let highscores = [];
  json.forEach((value) => {
    highscores.push(value.score);
  });
  highscores.sort(function (a, b) {
    return a - b;
  });
  highScore.innerText = `${highscores[0]}s`;
}
retrieveHighscore();
