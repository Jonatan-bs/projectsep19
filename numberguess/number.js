// Her skrives start variabler og lign. til senere brug.
'use strict';

  let randomNumberGen = Math.floor(Math.random() * 1000) + 1;

  const guesses_made = document.querySelector(".guesses_made");
  const lastGuess = document.querySelector('.last_guess');
  const hiOrLow = document.querySelector('.hiOrLow');
  const submitGuess = document.querySelector('.submitGuess');
  const field_for_guess = document.querySelector('.field_for_guess');
  let ditNavn = prompt('Skriv dit navn');

  let howManyGuesses = 1;
  let resetButton;

  function checkGuess() {
    let guessUser = Number(field_for_guess.value);
      if(howManyGuesses === 1){
        guesses_made.textContent = 'Forrige gæt:';
      }
      guesses_made.textContent += guessUser + ' ';

      if(guessUser === randomNumberGen){
        lastGuess.textContent = 'Tillykke! - Du gættede rigtigt!';
        lastGuess.style.backgroundcolor = 'green';
        hiOrLow.textContent = '';
        gameOver();
      } else if (howManyGuesses === 10) {
        lastGuess.textContent = 'Du brugte for mange gæt - Spillet er slut!';
        gameOver();
      } else {
          lastGuess.textContent = 'Dit gæt er forkert';
          lastGuess.style.backgroundcolor = 'red';
          if (guessUser < randomNumberGen) {
            hiOrLow.textContent = 'Sidste gæt var for lavt!'
          } else if(guessUser > randomNumberGen) {
            hiOrLow.textContent = 'Sidste gæt var for højt!'
          }
      }

      howManyGuesses++;
      field_for_guess.value = '';
      field_for_guess.focus();
  };

  function gameOver() {
    pauseTimer();
    field_for_guess.disabled = true;
    submitGuess.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start et nyt spil';
    document.getElementById('formforguesses').appendChild(resetButton);
    resetButton.addEventListener('click', resetTheGame);
  }

// Functionen til at få spillet til at reset når man klipper på knappen!
function resetTheGame() {
  howManyGuesses = 1;
  resetButton.onclick = resetTimer();
  const resetP = document.querySelectorAll('.content p');
  // For hver gang variable i er mindre end resetP.length skal den ligge en til.
  for (var i = 0; i < resetP.length; i++) {
    resetP[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);


    field_for_guess.disabled = false;
    submitGuess.disabled = false;
    field_for_guess.value = '';
    field_for_guess.focus();

    lastGuess.style.backgroundcolor = 'white';

    randomNumberGen = Math.floor(Math.random() * 1000) + 1;
}

// Timer Funtion osv //

var startTimerButton = document.querySelector('.startTimer');
var pauseTimerButton = document.querySelector('.pauseTimer');
var timerDisplay = document.querySelector('.timer');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;

function startTimer(){
  if(!running){
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);// change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.
    paused = 0;
    running = 1;
    timerDisplay.style.cursor = "auto";
  }
}

function pauseTimer(){
  if (!difference){
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
  } else {
    // if the timer was already paused, when they click pause again, start the timer again
    startTimer();
  }
}

function resetTimer(){
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
  timerDisplay.innerHTML = 'Start nyt spil!';
}

function getShowTime(){
  updatedTime = new Date().getTime();
  if (savedTime){
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference =  updatedTime - startTime;
  }
  // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((difference % (1000 * 60)) / 100);hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
  }

  submitGuess.addEventListener('click', checkGuess);



  // Create cookie from the scores

  if (i == scoreboard.length - 1 && playerTurn == 0) {
    for (let i = 0; i < playersAtt.length; i++) {
      let thisPlayersAtt = playersAtt[i];
      console.log(thisPlayersAtt)
      ///Check if user has higer score
      //for (let i = 0; i < Object.keys(cookiesObj).length; i++) {
      //  let thisCookieName = Object.keys(cookiesObj)[i];

      if (Object.keys(cookiesObj).includes("Guess" + thisPlayersAtt.name)) {
        let thisname = "Guess" + thisPlayersAtt.name;
        console.log(thisPlayersAtt.score)
        if (thisPlayersAtt.score > cookiesObj[thisname]) {
          console.log('Scoren er højere')
          createCookie("Guess" + thisPlayersAtt.name, thisPlayersAtt.score, 2000)
        } else {
          console.log('Scoren er lavere')
        }

      } else {
        createCookie("Guess" + thisPlayersAtt.name, thisPlayersAtt.score, 2000)
      }
    }
  }
}
//save cookie as OBJ
cookiesObj = document.cookie;
cookiesObj = cookieObj(cookiesObj)
}
