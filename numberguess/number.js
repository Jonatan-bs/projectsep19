// Her skrives start variabler og lign. til senere brug.
  let randomNumberGen = Math.floor(Math.random() * 1000) + 1;

  const guesses_made = document.queryselector('.guesses_made.');
  const lastGuess = document.queryselector('.last_guess.');
  const hiOrLow = document.queryselector('.hiOrLow.');
  const submitGuess = document.queryselector('.submitGuess.');
  const field_for_guess = document.queryselector('.field_for_guess.');

  let howManyGuesses = 1;
  let resetButton;

  function checkGuess() {
    alert('I am a placeholder');
  }
