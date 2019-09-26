// Her skrives start variabler og lign. til senere brug.
'use strict';
  let randomNumberGen = Math.floor(Math.random() * 1000) + 1;

  const guesses_made = document.querySelector(".guesses_made");
  const lastGuess = document.querySelector('.last_guess');
  const hiOrLow = document.querySelector('.hiOrLow');
  const submitGuess = document.querySelector('.submitGuess');
  const field_for_guess = document.querySelector('.field_for_guess');

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

  submitGuess.addEventListener('click', checkGuess);

  function gameOver() {
    field_for_guess.disabled = true;
    submitGuess.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start et nyt spil';
    document.getElementById('formforguesses').appendChild(resetButton);
    resetButton.addEventListener('click', resetTheGame);
  }

function resetTheGame() {
  howManyGuesses = 1;

  const resetP = document.querySelectorAll('.content p');
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
