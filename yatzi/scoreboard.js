let DthrowCount = [0,0,0,0,0,0]; // count instances of ones,twos...


function DthrowCounter(){ // fill DthrowCount
  DthrowCount = [0,0,0,0,0,0]
  for (let i = 0; i < Dthrow.length; i++) {
    DthrowCount[Dthrow[i]-1]++
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
    //Fill points for ones, twos ...
    scoreboard[0][Object.keys(scoreboard[0])[i]][0]=(i+1)*DthrowCount[i];

    //one pair
    if(DthrowCount[i]>1){
      scoreboard[0].onePair[0]=(i+1)*2 ;
      pairs++
      pairSum = pairSum + (i+1)*2
    }
    //two pairs
    if(pairs===2){
      scoreboard[0].twoPairs[0]=pairSum ;
    }
    //Three of a Kind
    if(DthrowCount[i]>2){
      scoreboard[0].threeOfKind[0]=(i+1)*3 ;
      threeOfKind++;
      threeOfKindSum = threeOfKindSum + (i+1)*3;
    }
    //Four of a Kind
    if(DthrowCount[i]>3){
      scoreboard[0].fourOfKind[0]=(i+1)*4 ;
    }
    //Full House
    if(pairs==2 && threeOfKind==1){
      scoreboard[0].fullHouse[0]=threeOfKindSum+pairSum-(threeOfKindSum/3)*2
    }
    //Chance.. print outside of loop
    chanceSum = chanceSum+DthrowCount[i]*(i+1)

    //Yatzy
    if(DthrowCount[i]===5){
      scoreboard[0].yatzy[0]=50 ;
    }
};

//print Chance
scoreboard[0].chance[0]=chanceSum;


//Small Straight
let sStraightInc = true;
for(let i=1; i<=5;i++){
    if(Dthrow.includes(i+1) && sStraightInc!=false){
      sStraightInc=false
    }
}
if(sStraightInc == true){
  scoreboard[0].sStraight[0]=15 ;
}


//big Straight
let bStraightInc = true;
for(let i=2; i<=6;i++){
    if(Dthrow.includes(i+1) && bStraightInc!=false){
      bStraightInc=false
    }
}
if(bStraightInc == true){
  scoreboard[0].bStraight[0]=20 ;
}





};


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
