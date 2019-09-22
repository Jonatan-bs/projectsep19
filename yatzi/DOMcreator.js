// Create player table row
let players = 1;

function createPlayerTable() {
  let table = document.getElementById('ytable')
  let tableTr = table.getElementsByTagName('tr')

  let th;

  for (let i = 0; i < tableTr.length; i++) {
    th = document.createElement('th')
    p = document.createElement('p')
    p.innerHTML = "player " + players;

    if (i == 0) {
      th.appendChild(p)
      tableTr[i].appendChild(th)
    } else if(i==tableTr.length-1){
      th.setAttribute('id','p'+ players + 's' + i)
      th = tableTr[i].appendChild(th)
    }

    else {

      th.addEventListener('click', chooseScore)
      th.setAttribute('id','p'+ players + 's' + i)
      th = tableTr[i].appendChild(th)

    }

  }
players++


}
window.addEventListener('load', createPlayerTable)
