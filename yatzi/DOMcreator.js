/// ON PAGE LOAD
function init() {



  //Create add players elements
  let input = document.createElement('input');
  input.id= "players";
  input.type= "text";
  let addPlayerButton = document.createElement('div');
  addPlayerButton.id ="addPlayer";
  addPlayerButton.innerHTML = "Add Player";
  let startButton = document.createElement('div');
  startButton.id ="startButton";
  startButton.innerHTML = "Start Game";
  let ul = document.createElement('ul');
  ul.id ="playerslist";

  document.getElementById('target').append(input)
  document.getElementById('target').append(addPlayerButton)
  document.getElementById('target').append(startButton)
  document.getElementById('target').append(ul)


  ///Assign addEventListeners to addplayers
  addPlayerButton.addEventListener('click', addPlayer)

  ///Assign addEventListeners to start button
  startButton.addEventListener('click', createPlayerTable)
}
window.addEventListener('load', init)


// Add players
function addPlayer() {
  // make array of players
  player = document.getElementById('players');
  playerArr.push(player.value);
  // Print players in dom
  li = document.createElement('li');
  p = document.createElement('p');
  p.append(player.value);
  li.appendChild(p);
  let playersLi = document.getElementById('playerslist');
  playersLi.appendChild(li);
}


// Create player table row

function createPlayerTable() {
  document.getElementById('target').innerHTML="";
  createScoreboards()
  //create  Dice flex box
  let diceDivCont = document.createElement('div')
  diceDivCont.className ='flex-container';
  let diceDiv;
  let diceDivs=[];
  let p;

  for (i = 1; i <= 5; i++) {

    diceDiv = document.createElement('div')
    diceDiv.className = 'dice';
    diceDiv.id = "d" + i;
    p = document.createElement('p');
    p.innerHTML = i;
    diceDiv.appendChild(p)
    diceDivCont.appendChild(diceDiv)
    diceDivs.push(diceDiv)
  }

  //create play button
  let playbutton = document.createElement('div')
  playbutton.id = 'playbutton';
  playbutton.innerHTML = 'play';



  /////////// Create table

  let scoreboardNames = ['', 'ones', 'twos', 'threes', 'fours', 'fives', 'sixes', 'onePair', 'twoPairs', 'threeOfKind', 'fourOfKind', 'sStraight', 'bStraight', 'fullHouse', 'chance', 'yatzy','score']

  let table= document.createElement('table')
  table.id = "ytable";
  let tableTr;
    let tableTrs=[];
  let th;

  for(let i=0; i<scoreboardNames.length;i++){
     tableTr=document.createElement('tr')
     th=document.createElement('th')
     th.innerHTML = scoreboardNames[i]
     tableTr.appendChild(th)
     table.appendChild(tableTr)
     tableTrs.push(tableTr)
  }

  document.getElementById('target').appendChild(diceDivCont)
  document.getElementById('target').appendChild(playbutton)
  document.getElementById('target').appendChild(table)

  /////////////// create players rows

  //let table = document.getElementById('ytable')
  //let tableTr = table.getElementsByTagName('tr')
  //let th;


  for (let i = 0; i < playerArr.length; i++) {
    for (let i2 = 0; i2 < tableTrs.length; i2++) {
      th = document.createElement('th')
      p = document.createElement('p')
      p.innerHTML = playerArr[i]; // Player name


      if (i2 == 0) { //if first row write players name
        th.appendChild(p)
        tableTrs[i2].appendChild(th)
      } else if (i2 == tableTrs.length - 1) { //if last row, make score box with no event listener
        th.setAttribute('id', 'p' + i + 's' + i2)
        th = tableTrs[i2].appendChild(th)
      } else { //create score boxes

        th.addEventListener('click', chooseScore)
        th.setAttribute('id', 'p' + i + 's' + i2)
        th = tableTrs[i2].appendChild(th)

      }

    }


  }

  /////// Add event listeners////

  ///Assign addEventListeners to diceDivs
  for (i = 0; i < diceDivs.length; i++) {
    diceDivs[i].addEventListener('click', holdDices)
  }

  ///Assign addEventListeners to play button
  playbutton.addEventListener('click', play)


};










//window.addEventListener('load', createPlayerTable)
