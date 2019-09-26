//Scoreboard tester  DthrowCounter(); pointFiller();  fillDom() ; scoreboard;

let DthrowCount = []; // count instances of ones,twos...
let scoreboard = [];
let scoreboardEmptyCopy;

function createScoreboards() {
  scoreboardEmpty = {
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
  };


  for (let i = 0; i < playerArr.length; i++) {
    scoreboardEmptyDeepCopy = JSON.parse(JSON.stringify(scoreboardEmpty));
    scoreboard.push(scoreboardEmptyDeepCopy);
  }
}





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
  resetNotPickedScores(playerTurn)
  let pairs = 0;
  let pairSum = 0;
  let threeOfKind = 0;
  let threeOfKindSum = 0;
  let chanceSum = 0;
  let playersScoreboard = scoreboard[playerTurn];

  for (let i = 0; i < DthrowCount.length; i++) {
    if (playersScoreboard[Object.keys(playersScoreboard)[i]][1] === false) { //check if score is picked

      //Fill points for ones, twos ...
      playersScoreboard[Object.keys(playersScoreboard)[i]][0] = (i + 1) * DthrowCount[i];
    };

    //one pair
    if (DthrowCount[i] > 1) {

      //let testI = i+1;
      //console.log("tal:" + testI + " antal:" + DthrowCount[i])
      if (playersScoreboard.onePair[1] == false) {
        playersScoreboard.onePair[0] = (i + 1) * 2;
      }
      pairs++
      pairSum = pairSum + (i + 1) * 2
      //console.log("antal par:" + pairs)
    }
    //two pairs
    if (pairs === 2 && playersScoreboard.twoPairs[1] == false) {
      playersScoreboard.twoPairs[0] = pairSum;
    }

    //Three of a Kind
    if (DthrowCount[i] > 2) {
      if (playersScoreboard.threeOfKind[1] == false) {
        playersScoreboard.threeOfKind[0] = (i + 1) * 3;
      }
      threeOfKind++;
      threeOfKindSum = threeOfKindSum + (i + 1) * 3;
    }
    //Four of a Kind
    if (DthrowCount[i] > 3 && playersScoreboard.fourOfKind[1] == false) {
      playersScoreboard.fourOfKind[0] = (i + 1) * 4;
    }
    //Full House
    if (pairs == 2 && threeOfKind == 1 && playersScoreboard.fullHouse[1] == false) {
      playersScoreboard.fullHouse[0] = threeOfKindSum + pairSum - (threeOfKindSum / 3) * 2
    }

    //Chance.. print outside of loop
    chanceSum = chanceSum + DthrowCount[i] * (i + 1)

    //Yatzy
    if (DthrowCount[i] === 5 && playersScoreboard.yatzy[1] == false) {
      playersScoreboard.yatzy[0] = 50;
    }
  }

  // Chance
  if (playersScoreboard.chance[1] == false) {
    playersScoreboard.chance[0] = chanceSum;
  }

  //Small Straight
  if (playersScoreboard.sStraight[1] == false) {
    let sStraightInc = true;
    for (let i = 1; i <= 5; i++) {
      sStraightInc = Dthrow.includes(i) && sStraightInc;

    }
    if (sStraightInc == true) {
      playersScoreboard.sStraight[0] = 20;
    }
  }

  //big Straight
  if (playersScoreboard.bStraight[1] == false) {
    let bStraightInc = true;
    for (let i = 2; i <= 6; i++) {
      bStraightInc = Dthrow.includes(i) && bStraightInc;

    }
    if (bStraightInc == true) {
      playersScoreboard.bStraight[0] = 20;
    }
  }
};

//Fill DOM scoreBoard

function fillDom() {
  let playersScoreboard = scoreboard[playerTurn];
  let scorVal;
  let scorName;


  for (let i = 0; i < Object.keys(playersScoreboard).length; i++) {
    scorName = Object.keys(playersScoreboard)[i];
    scorArr = playersScoreboard[scorName];
    scorVal = scorArr[0];
    /*
    console.log(scorName);
    console.log(scorArr);
    console.log(scorVal);
*/
    let table = document.getElementById('ytable')
    let tableTr = table.getElementsByTagName('tr')
    let th;

    th = tableTr[i + 1].getElementsByTagName('th')[playerTurn + 1]
    if (scorVal == 0) {
      th.innerHTML = "";
    } else {
      th.innerHTML = scorVal;
    }
  }


}


//Reset not picked scores on scoreBoard
function resetNotPickedScores(playerTurn) {
  let playersScoreboard = scoreboard[playerTurn];
  let fullscore = 0;
  let scoreArr;
  for (let i = 0; i < Object.keys(playersScoreboard).length; i++) {
    scoreArr = playersScoreboard[Object.keys(playersScoreboard)[i]];

    if (scoreArr[1] === false) {
      scoreArr[0] = 0;
    }

    fullscore = fullscore + scoreArr[0]
  }

  //print full score

  let scoreBox = document.getElementById('p' + playerTurn + 's16')
  scoreBox.innerHTML = fullscore;
}



// choose score
function chooseScore(elm) {

  //
  let playersScoreboard = scoreboard[playerTurn];
  if (turnNr !== 0) {


    removeClassActive()
    dicesToHold = [];
    elm.target.removeEventListener('click', chooseScore)
    let targetID = elm.target.id
    let scorNr = targetID.substring(3, targetID.length) - 1;
    let playerNr = targetID.substring(1, 2);
    playersScoreboard[Object.keys(playersScoreboard)[scorNr]][1] = true;
    elm.target.classList.add('picked');
    playbutton.addEventListener('click', play)
    playbutton.classList.remove('disabled')
    turnNr = 0;
    Dthrow = []
    DthrowCount = [];
    resetNotPickedScores(playerNr)
    fillDom();
    //removeEventListeners
    let th;
    for (let i = 1; i <= 15; i++) {
      th = document.getElementById('p' + playerTurn + "s" + i)
      th.removeEventListener('click', chooseScore)
    }


    //next players turn
    if (playerTurn < playerArr.length - 1) {
      playerTurn++
    } else {
      playerTurn = 0;
    }
    //addEventListeners
    for (let i = 1; i <= 15; i++) {
      th = document.getElementById('p' + playerTurn + "s" + i)
      th.addEventListener('click', chooseScore)
    }
  }
  //Save cookie if all scores are filled
  //let thisScoreboard;
  //let keyNames;
  let playersAtt = [];
  for (let i = 0; i < scoreboard.length; i++) {
    let fullscore = 0;
    thisScoreboard = scoreboard[i];
    keyNames = Object.keys(thisScoreboard);
    let thisPlayer = i;

    //let allPicked;
    for (let i = 0; i < keyNames.length; i++) {
      keyName = keyNames[i];
      if (thisScoreboard[keyName][1] == false) {
        return
      }
      fullscore = fullscore + thisScoreboard[keyName][0]
    }

    //Calculate Score

    let playerAtt = {}
    playerAtt.name = playerArr[i];
    playerAtt.score = fullscore;
    playersAtt.push(playerAtt)
    if (i == scoreboard.length - 1 && playerTurn == 0) {
      for (let i = 0; i < playersAtt.length; i++) {
        let thisPlayersAtt = playersAtt[i];

        ///Check if user has higer score
        //for (let i = 0; i < Object.keys(cookiesObj).length; i++) {
        //  let thisCookieName = Object.keys(cookiesObj)[i];
        if (Object.keys(cookiesObj).includes(thisPlayersAtt.name)) {
          console.log(cookiesObj[thisPlayersAtt.name])
          console.log(thisPlayersAtt.score)
          if (thisPlayersAtt.score > cookiesObj[thisPlayersAtt.name]) {
            //console.log('score is higher')
            createCookie(thisPlayersAtt.name, thisPlayersAtt.score, 2000)
          } else {
            //console.log('score is lower')
          }

        } else {
          createCookie(thisPlayersAtt.name, thisPlayersAtt.score, 2000)
        }
      }
    }
  }
  //save cookie as OBJ
  cookiesObj = document.cookie;
  cookiesObj = cookieObj(cookiesObj)
}
