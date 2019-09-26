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
let playerTurn = 0;
//let playbutton;






/// Fill DOM dices

function fillDivs() {
  let diceDivs = document.getElementsByClassName('dice');
  let img;

  for (i = 0; i < diceDivs.length; i++) {

    img = diceDivs[i].getElementsByTagName('img')[0];

    switch (Dthrow[i]) {
      case 1:
      img.src = "one.svg"
      break;
      case 2:
      img.src = "two.svg"
      break;
      case 3:
      img.src = "three.svg"
      break;
      case 4:
      img.src = "four.svg"
      break;
      case 5:
      img.src = "five.svg"
      break;
      case 6:
      img.src = "six.svg"
      break;

      default:

    }

    //diceDivs[i].getElementsByTagName('p')[0].innerHTML = Dthrow[i]
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
    playbutton.removeEventListener('click', play)
    playbutton.classList.add('disabled')
  }
  //Dthrow = [1,1,1,1,1]
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
    addClassActive()
    //turnNr = 0;
    canHold = false;
    last = true;
    return rollDice(dicesToHold)
  }

}


/// Chose dice to stick with
function holdDices(elm) {
  elm = elm.target;
  if (elm.tagName === 'IMG') {
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
  let diceDivs = document.getElementsByClassName('dice');
  for (let i = 0; i < diceDivs.length; i++) {
    if (diceDivs[i].classList.contains('active')) {
      diceDivs[i].classList.remove('active')
    }
  }
}
/// add class active on dices
function addClassActive() {
  let diceDivs = document.getElementsByClassName('dice');
  for (let i = 0; i < diceDivs.length; i++) {
      diceDivs[i].classList.add('active')
  }
}


/// Play one turn
function play() {
  playTurn(dicesToHold)
  DthrowCounter();
  pointFiller();
  fillDom();
}

//play turn on spacebar click
document.onkeyup = function(e){
  let startbtn = document.getElementById('startButton');
    if(e.keyCode == 32 && startbtn==null ){
        play()
    }
}
