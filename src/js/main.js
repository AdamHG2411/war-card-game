//Variables
let player1StackSize = document.querySelector('#player1StackSize')
player1StackSize.innerHTML = "0"
let player1InPlay = document.querySelector ('#player1InPlay')
let player1Rank = document.querySelector('#player1Rank')
let player1Suit = document.querySelector('#player1Suit')
let player2StackSize = document.querySelector('#player2StackSize')
player2StackSize.innerHTML = "0"
let player2InPlay = document.querySelector('#player2InPlay')
let player2Rank = document.querySelector('#player2Rank')
let player2Suit = document.querySelector('#player2Suit')
let startGameButton = document.querySelector('#startGameButton')
startGameButton.addEventListener('click', startGame)
let warButton = document.querySelector('#warButton')
warButton.style.display = "none"
warButton.addEventListener('click', makeWar)
let suitImg1 = document.createElement('img')
player1InPlay.append(suitImg1)
suitImg1.style.display = "none"
let suitImg2 = document.createElement('img')
player2InPlay.append(suitImg2)
suitImg2.style.display = "none"
player1Rank.innerHTML = " "
player1Suit.innerHTML = " "
player2Rank.innerHTML = " "
player2Suit.innerHTML = " "

//Classes
class Card {
  constructor(suit,rank,score) {
    this.suit = suit
    this.rank = rank
    this.score = score
  }
}
class Deck {
  constructor() {
    this.quant = 52
    this.deck = []
    this.suits = ["hearts", "diamonds", "clubs", "spades"]
    this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]
    this.scores = [2,3,4,5,6,7,8,9,10,11,12,13,14]
  }
  shuffle() {
    this.deck = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        this.deck.push(new Card(this.suits[i],this.ranks[j], this.scores[j]))
      }
    }
    let currentIndex = this.deck.length, tempValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tempValue = this.deck[currentIndex];
      this.deck[currentIndex] = this.deck[randomIndex];
      this.deck[randomIndex] = tempValue;
    }
    return this.deck
  }
  draw() {
    console.log(`${this.deck[0].rank} of ${this.deck[0].suit}`)
    let drawnCard = this.deck[0]
    this.deck.shift()
    // if (this.deck.length === 0) {
    //   this.shuffle()
    // }
    return drawnCard
  }
}

class Player {
  constructor(name, rankText, suitText) {
    this.name = name
    this.stack = [];
    this.inPlay = [];
    this.rankText = rankText
    this.suitText = suitText
  }
  takeHalf(obj) {
    for (i = 0; i < 26; i++) {
      this.stack.push(obj.draw())
    }
    console.log(this.stack)
  }
  play(evt) {
    evt.preventDefault()
    this.inPlay.push(this.stack.shift())
    console.log(this.inPlay[0])
    this.rankText.innerHTML = this.inPlay[0].rank
    this.suitText.innerHTML = this.inPlay[0].suit
    //This is the last of several attempts to get the suit images to display on the card - still not working at this point - think it has something to do with parcel
    if (this.name === 'player1') {
      suitImg1.setAttribute('src',`../img/${this.inPlay[0].suit}.png`)
    } else {
      suitImg2.setAttribute('src',`../img/${this.inPlay[0].suit}.png`)
    }
    player1StackSize.innerHTML = `${player1.stack.length}`
    player2StackSize.innerHTML = `${player2.stack.length}`
    console.log(`${this.name} played the ${this.inPlay[0].rank} of ${this.inPlay[0].suit}`)
  }
}

//Functions
function makeWar(evt) {
  player1.play(evt)
  player2.play(evt)
  if (player1.inPlay[0].score > player2.inPlay[0].score) {
    player1.stack.push(player1.inPlay.shift())
    player1.stack.push(player2.inPlay.shift())
    console.log('player1 wins this battle')
  } else if (player1.inPlay[0].score < player2.inPlay[0].score) {
    player2.stack.push(player1.inPlay.shift())
    player2.stack.push(player2.inPlay.shift())
    console.log('player2 wins this battle')
  } else if (player1.inPlay[0].score === player2.inPlay[0].score) {
    console.log("there was a tie")
    player1.stack.push(player1.inPlay.shift())
    player2.stack.push(player2.inPlay.shift())
    // tiebreaker(evt)
  } else {
    console.log('something is broken')
  }
  player1StackSize.innerHTML = `${player1.stack.length}`
  player2StackSize.innerHTML = `${player2.stack.length}`
  if (player1.stack.length === 0) {
    console.log("Player 2 wins!")
    alert("Player 2 wins!")
  } else if (player2.stack.length === 0) {
    console.log("Player 1 wins!")
    alert("Player 1 wins!")
  }
}

//Started to attempt a tiebreaker but didn't quite get it working
// function tiebreaker(evt) {
//   for (i = 0; i < 3; i ++) {
//     player1.play(evt)
//     player2.play(evt)
//   }
//   while (player1.inPlay.length > 0) {
//     if (player1.inPlay[0].score > player2.inPlay[0].score) {
//       for (i = 0; i < player1.inPlay.length; i++) {
//         player1.stack.push(player1.inPlay.shift())
//         player1.stack.push(player2.inPlay.shift())
//       }
//       console.log('player1 won the tiebreaker')
//     } else if (player1.inPlay[0].score < player2.inPlay[0].score) {
//       for (i = 0; i < player1.inPlay.length; i++) {
//         player2.stack.push(player1.inPlay.shift())
//         player2.stack.push(player2.inPlay.shift())
//       }
//       console.log('player2 won the tiebreaker')
//     } else if (player1.inPlay[0].score === player2.inPlay[0].score) {
//       console.log("there was another tie - let's start over")
//       tiebreaker()
//     } else {
//       console.log('something is broken')
//     }
//   }
// }

function startGame(evt) {
  evt.preventDefault();
  player1Rank.innerHTML = " "
  player1Suit.innerHTML = " "
  player2Rank.innerHTML = " "
  player2Suit.innerHTML = " "
  startGameButton.textContent = 'Reset'
  player1.stack = [];
  player2.stack = [];
  onlyDeck.shuffle()
  player1.takeHalf(onlyDeck)
  player2.takeHalf(onlyDeck)
  player1StackSize.innerHTML = `${player1.stack.length}`
  player2StackSize.innerHTML = `${player2.stack.length}`
  warButton.style.display = "block"
}

//Instances of classes
let onlyDeck = new Deck()
let player1 = new Player("player1", player1Rank, player1Suit)
console.log(player1)
let player2 = new Player("player2", player2Rank, player2Suit)
console.log(player2)

//Commands to initialize game - now in a button
// startGame();