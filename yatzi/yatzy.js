////////////////////////////
/////// YATZY //////////////
////////////////////////////


/// Define varriables
let scoreBoard = [];
let Dthrow = [2, 1, 1, 1, 1, 1];
let turnNr = 0;
let dicesToHold = []; // Dices to stick with
let canHold = false; // whether player can pick dice to hold
let diceDivs;

/// ON PAGE LOAD
function init() {
  diceDivs = document.getElementsByClassName('dice');

  ///Assign addEventListeners
  for (i = 0; i < diceDivs.length; i++) {
    diceDivs[i].addEventListener('click', holdDices)
  }
}
window.addEventListener('load', init)

/// Create DOM elements



/// Fill DOM dices

function fillDivs() {
  for (i = 0; i < diceDivs.length; i++) {
    diceDivs[i].getElementsByTagName('p')[0].innerHTML = Dthrow[i]
  }
}




/// Roll 5 dice

function rollDice(dicesToHold) { /// dicesToHold array with numbers from 0-5
  if (dicesToHold == undefined) {
    let dicesToHold = []
  };
  for (let i = 0; i < 6; i++) {
    if (!dicesToHold.includes(i)) { /// check if dice is picked to stick with
      let randDiceNr = Math.floor(Math.random() * 6 + 1);
      Dthrow[i] = randDiceNr
    }
  }
  fillDivs()
  return Dthrow = Dthrow;

}

/// Play 3 turns

function playTurn(dicesToHold) {
  if (turnNr < 2) { /// if not last throw of turn, make throw
    turnNr++
    canHold = true;
    return rollDice(dicesToHold)
  } else { // Sidste skud
    removeClassActive()
    turnNr = 0;
    canHold = false;
    console.log('ikk flere skud')
    return rollDice(dicesToHold)
  }

}

///////////
/// Chose dice to stick with
function holdDices(elm) {
  elm = elm.target;
  if (canHold == true) { //if last turn played canhold is not true
    if (elm.classList.contains('active')) {
      elm.classList.remove('active')
      console.log(elm)
    } else {
      elm.classList.add('active')
      console.log(elm)
    }
  }
}


/// Remove class active on dices
function removeClassActive(){
for (i = 0; i < diceDivs.length; i++) {
if (diceDivs[i].classList.contains('active')) {
  diceDivs[i].classList.remove('active')
}
}
}


/// Play one turn
// console.log(playTurn(dicesToHold))


/// Show posibbilities in scoreBoard


/// Choose and assig score
