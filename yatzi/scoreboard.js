//Scoreboard tester  DthrowCounter(); pointFiller();  fillDom() ; scoreboard;

let DthrowCount = []; // count instances of ones,twos...

let scoreboard = [{
  ones: [0, false], // 0=points ; turns true if score is filled in
  twos: [0, false],
  threes: [0, false],
  fours: [0, false],
  fives: [0, false],
  sixes: [0, false],
  onePair: [0, false],
  twoPairs: [0, false],
  threeOfKind: [0, false],
  fourOfKind: [0, false],
  sStraight: [0, false],
  bStraight: [0, false],
  fullHouse: [0, false],
  chance: [0, false],
  yatzy: [0, false],
}];



// fill DthrowCount
function DthrowCounter() {
  let a;

  DthrowCount = [0, 0, 0, 0, 0, 0] // count instances of ones,twos...
  for (let i = 0; i < Dthrow.length; i++) {
    DthrowCount[Dthrow[i] - 1]++
  }
}

///fill points in scoreboard

function pointFiller() {
  let pairs = 0;
  let pairSum = 0;
  let threeOfKind = 0;
  let threeOfKindSum = 0;
  let chanceSum = 0;

  for (let i = 0; i < DthrowCount.length; i++) {
    if (scoreboard[0][Object.keys(scoreboard[0])[i]][1] === false) { //check if score is picked

      //Fill points for ones, twos ...
      scoreboard[0][Object.keys(scoreboard[0])[i]][0] = (i + 1) * DthrowCount[i];
    };
    //one pair
    if (DthrowCount[i] > 1) {
      if (scoreboard[0].onePair[1] == false) {
        scoreboard[0].onePair[0] = (i + 1) * 2;
      }
      pairs++
      pairSum = pairSum + (i + 1) * 2
    }
    //two pairs
    if (pairs === 2 && scoreboard[0].twoPairs[1] == false) {
      scoreboard[0].twoPairs[0] = pairSum;
    }

    //Three of a Kind
    if (DthrowCount[i] > 2) {
      if (scoreboard[0].threeOfKind[1] == false) {
        scoreboard[0].threeOfKind[0] = (i + 1) * 3;
      }
      threeOfKind++;
      threeOfKindSum = threeOfKindSum + (i + 1) * 3;
    }
    //Four of a Kind
    if (DthrowCount[i] > 3 && scoreboard[0].fourOfKind[1] == false) {
      scoreboard[0].fourOfKind[0] = (i + 1) * 4;
    }
    //Full House
    if (pairs == 2 && threeOfKind == 1 && scoreboard[0].fullHouse[1] == false) {
      scoreboard[0].fullHouse[0] = threeOfKindSum + pairSum - (threeOfKindSum / 3) * 2
    }

    //Chance.. print outside of loop
    chanceSum = chanceSum + DthrowCount[i] * (i + 1)

    //Yatzy
    if (DthrowCount[i] === 5 && scoreboard[0].yatzy[1] == false) {
      scoreboard[0].yatzy[0] = 50;
    }
  }

  // Chance
  if (scoreboard[0].chance[1] == false) {
    scoreboard[0].chance[0] = chanceSum;
  }

  //Small Straight
  if (scoreboard[0].sStraight[1] == false) {
    let sStraightInc = true;
    for (let i = 1; i <= 5; i++) {
      sStraightInc = Dthrow.includes(i) && sStraightInc;

    }
    if (sStraightInc == true) {
      scoreboard[0].sStraight[0] = 20;
    }
  }

  //big Straight
  if (scoreboard[0].bStraight[1] == false) {
    let bStraightInc = true;
    for (let i = 2; i <= 6; i++) {
      bStraightInc = Dthrow.includes(i) && bStraightInc;

    }
    if (bStraightInc == true) {
      scoreboard[0].bStraight[0] = 20;
    }
  }
};

//Fill DOM scoreBoard

function fillDom() {
  let scorVal;
  let scorName;


  for (let i = 0; i < Object.keys(scoreboard[0]).length; i++) {
    scorName = Object.keys(scoreboard[0])[i];
    scorArr = scoreboard[0][scorName];
    scorVal = scorArr[0];

    let table = document.getElementById('ytable')
    let tableTr = table.getElementsByTagName('tr')
    let th;

    th = tableTr[i + 1].getElementsByTagName('th')[1]
    if (scorVal == 0) {
      th.innerHTML = "";
    } else {
      th.innerHTML = scorVal;
    }
  }


}


//Reset not picked scores on scoreBoard
function resetNotPickedScores(player) {
  let fullscore = 0;
  let scoreArr;
  for (let i = 0; i < Object.keys(scoreboard[0]).length; i++) {
    scoreArr = scoreboard[0][Object.keys(scoreboard[0])[i]];

    if (scoreArr[1] === false) {
      scoreArr[0] = 0;
    }

    fullscore = fullscore + scoreArr[0]
  }

  //print full score

  let scoreBox = document.getElementById('p' + player + 's16')
  scoreBox.innerHTML = fullscore;
}



// choose score
function chooseScore(elm) {
  if (turnNr !== 0) {
    removeClassActive()
    dicesToHold = [];
    elm.target.removeEventListener('click', chooseScore)
    let targetID = elm.target.id
    let scorNr = targetID.substring(3, targetID.length) - 1;
    let playerNr = targetID.substring(1, 2);
    scoreboard[0][Object.keys(scoreboard[0])[scorNr]][1] = true;
    elm.target.classList.add('picked');
    playButton.addEventListener('click', play)
    playButton.classList.remove('disabled')
    turnNr = 0;
    Dthrow = []
    DthrowCount = [];
    resetNotPickedScores(playerNr)
    fillDom();
  }
}
