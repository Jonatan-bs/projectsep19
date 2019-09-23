// Add players
function addPlayer() {
  // make array of players
  player = document.getElementById('players');
  playerArr.push(player.value);
  console.log(player.value);
  // Print players in dom
  li = document.createElement('li');
  p = document.createElement('p');
  p.append(player.value);
  li.appendChild(p);
  playersLi.appendChild(li);
}


// Create player table row

function createPlayerTable() {

  createScoreboards()
  ///////////////

  let table = document.getElementById('ytable')
  let tableTr = table.getElementsByTagName('tr')
  let th;


  for (let i = 0; i < playerArr.length; i++) {
    for (let i2 = 0; i2 < tableTr.length; i2++) {
      th = document.createElement('th')
      p = document.createElement('p')
      p.innerHTML = playerArr[i]; // Player name


      if (i2 == 0) {
        th.appendChild(p)
        tableTr[i2].appendChild(th)
      } else if (i2 == tableTr.length - 1) {
        th.setAttribute('id', 'p' + i + 's' + i2)
        th = tableTr[i2].appendChild(th)
      } else {

        th.addEventListener('click', chooseScore)
        th.setAttribute('id', 'p' + i + 's' + i2)
        th = tableTr[i2].appendChild(th)

      }

    }
  }


}


//window.addEventListener('load', createPlayerTable)
