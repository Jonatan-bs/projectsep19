var init = function() {
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var wordarray;      // the different words in an array
  var word;           // the selected word
  var guess;          // the guess
  var guesses = [];   // stored guesses
  var attempts;       // player's attempts
  var counter;        // correct guesses
  var space;          // number of spaces in word '-'

  // get elements
  var showAttempts = document.getElementById('myattempts');

  // creating buttons for the alphabet
  var buttons = function () {
    letterButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      letterButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  // creating guesses
  result = function () {
    wordHolder =  document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // show attempts
  comments = function () {
    showAttempts.innerHTML = "You have " + attempts + " attempts left";
    if (attempts < 1) {
      showAttempts.innerHTML = "Rest in piece, you just got hung. You should have written " + word + ", so you wouldn't have died.";
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showAttempts.innerHTML = "You won with " + attempts + " attempts left";
      }
    }
  }

  // onclick function
  check = function () {
    list.onclick = function () {
      var guess = (this.innerHTML);
      this.setAttribute('class', 'active');
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        }
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        attempts -= 1;
        comments();
      }
      else {
        comments();
      }
    }
  }

  // play that damn game
  play = function () {
    wordarray = ['museum', 'horn', 'century', 'advance', 'fine', 'review', 'meme', 'science', 'javascript', 'square', 'html', 'swarm', 'urine', 'gold', 'dabbing', 'expertise', 'acid', 'birthday', 'desire', 'netflix'];
    word = wordarray[Math.floor(Math.random() * wordarray.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    guesses = [];
    attempts = 10;
    counter = 0;
    space = 0;
    result();
    comments();
  }

  play();

  // resetting the game
  document.getElementById('reset').onclick = function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    play();
  }

}
window.addEventListener('load', init);
