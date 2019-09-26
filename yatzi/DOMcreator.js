//Cookies load

if (document.cookie!==""){
var cookiesObj = document.cookie;
cookiesObj = cookieObj(cookiesObj);

let cookiesStr="";
//create highscore div
let div = document.createElement('div')
div.id = "highscore";


//show cookies
for(i=0; i<Object.keys(cookiesObj).length; i++){
  let keys = Object.keys(cookiesObj)[i];
  let scores = keys + " " + cookiesObj[keys] + "; ";
  cookiesStr = cookiesStr + scores
}
console.log(cookiesStr);
div.innerHTML = cookiesStr;
window.addEventListener('load',function(){document.getElementById('target').appendChild(div)})


} else{
var cookiesObj = [];
}

/// ON PAGE LOAD
function init() {







  //Create add players elements
  let input = document.createElement('input');
  input.id= "players";
  input.type= "text";
  let addPlayerButton = document.createElement('div');
  addPlayerButton.id ="addPlayer";
    addPlayerButton.className ="btn";
  addPlayerButton.innerHTML = "Add Player";
  let startButton = document.createElement('div');
  startButton.id ="startButton";
  startButton.innerHTML = "Start Game";
  startButton.className ="btn disabled";

  let ul = document.createElement('ul');
  ul.id ="playerslist";
  let divCont = document.createElement('div');
  divCont.className= "playersCont";


  divCont.appendChild(input)
  divCont.appendChild(addPlayerButton)
  divCont.appendChild(startButton)

  document.getElementById('target').append(divCont)
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
  if(playerArr.includes(player.value)){
    alert('Player already exist')
  }
  else if(player.value!==""){
  playerArr.push(player.value);
  // Print players in dom
  let li = document.createElement('li');
  let p = document.createElement('p');
  p.append(player.value);
  p.addEventListener('click',removePlayer)

  li.appendChild(p);
  let playersLi = document.getElementById('playerslist');
  playersLi.appendChild(li);
  document.getElementById('startButton').classList.remove('disabled')
}
///else input empty

}


// Create player table row

function createPlayerTable() {
  if(playerArr.length>0){
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
    img = document.createElement('img');
    img.src="one.svg";
    img.alt="one";
    //img.innerHTML = i;
    diceDiv.appendChild(img)
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

        if(i===0){th.addEventListener('click', chooseScore)}
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

}
};


//Remove player
function removePlayer(elm){
  let playerName = elm.target.innerHTML;
  playerArr.pop(playerName)
  elm.target.parentNode.removeChild(elm.target);

  if(playerArr.length==0){
  document.getElementById('startButton').classList.add('disabled')
}
}







//window.addEventListener('load', createPlayerTable)
