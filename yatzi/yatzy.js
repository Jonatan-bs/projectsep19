////////////////////////////
/////// YATZY //////////////
////////////////////////////



/// Define varriables

let Dthrow = [];
let turnNr = 0;
let dicesToHold = []; // Dices to stick with
let dicesToHold2;
let last = false;
let canHold = false; // whether player can pick dice to hold
//let diceDivs;
let elmNr;
let playerArr = [];
let playersLi;
let player;
let li;
let p;



/// ON PAGE LOAD
function init() {
  let diceDivs = document.getElementsByClassName('dice');
  let playButton = document.getElementById('playbutton');
  let startButton = document.getElementById('startButton');
  let addPlayerButton = document.getElementById('addPlayer');
   playersLi = document.getElementById('playerslist');



  ///Assign addEventListeners to diceDivs
  for (i = 0; i < diceDivs.length; i++) {
    diceDivs[i].addEventListener('click', holdDices)
  }

  ///Assign addEventListeners to play button
  playButton.addEventListener('click', play)

  ///Assign addEventListeners to addplayers
  addPlayerButton.addEventListener('click', addPlayer)

  ///Assign addEventListeners to start button
  startButton.addEventListener('click', createPlayerTable)
}
window.addEventListener('load', init)



/// Fill DOM dices

function fillDivs() {
  for (i = 0; i < diceDivs.length; i++) {
    diceDivs[i].getElementsByTagName('p')[0].innerHTML = Dthrow[i]
  }
}




/// Roll 5 dice

function rollDice() { /// dicesToHold array with numbers from 0-5
  for (let i = 0; i < 5; i++) {
    if (!dicesToHold.includes(i)) { /// check if dice is picked to stick with
      let randDiceNr = Math.floor(Math.random() * 6 + 1);
      Dthrow[i] = randDiceNr
    }
  }

  if (last === true) {
    last = false;
    dicesToHold = [];
    playButton.removeEventListener('click', play)
    playButton.classList.add('disabled')
  }
  fillDivs()
  return Dthrow = Dthrow;

}

/// Play 3 turns

function playTurn() {
  if (turnNr < 2) { /// if not last throw of turn, make throw
    turnNr++
    canHold = true;
    return rollDice(dicesToHold)
  } else { // Sidste skud
    removeClassActive()
    //turnNr = 0;
    canHold = false;
    last = true;
    return rollDice(dicesToHold)
  }

}


/// Chose dice to stick with
function holdDices(elm) {
  elm = elm.target;
  if(elm.tagName==='P'){
    elm = elm.parentNode;
  };

  if (canHold == true) { //if last turn played canhold is not true
    if (elm.classList.contains('active')) {
      elm.classList.remove('active');
      elmNr = Number(elm.getAttribute('id').replace('d', "")) - 1;
      dicesToHold.pop(elmNr);
    } else {
      elm.classList.add('active');
      elmNr = Number(elm.getAttribute('id').replace('d', "")) - 1;
      dicesToHold.push(elmNr);
    }
  }
}


/// Remove class active on dices
function removeClassActive() {
  for (let i = 0; i < diceDivs.length; i++) {
    if (diceDivs[i].classList.contains('active')) {
      diceDivs[i].classList.remove('active')
    }
  }
}


/// Play one turn
function play() {
  playTurn(dicesToHold)
  DthrowCounter();
  pointFiller();
  fillDom() ;
}


/// Show posibbilities in scoreBoard


/// Choose and assig score
