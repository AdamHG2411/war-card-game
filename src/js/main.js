let player1StackSize = document.querySelector('#player1StackSize')
let player1InPlay = document.querySelector ('#player1InPlay')
let player1Suit = document.querySelector('#player1Suit div')
let player1Rank = document.querySelector('#player1Rank')
let player2StackSize = document.querySelector('#player2StackSize')
let player2InPlay = document.querySelector('#player2InPlay')
let player2Suit = document.querySelector('#player2Suit div')
let player2Rank = document.querySelector('#player2Rank')

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
  constructor(name, rankText, suitInPlay) {
    this.name = name
    this.stack = [];
    this.inPlay = [];
    this.rankText = rankText
    this.suitInPlay = suitInPlay
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
    this.suitInPlay.removeAttribute('class')
    this.suitInPlay.setAttribute('class', `${this.inPlay[0].suit}`)
    console.log(this.suitInPlay)
    //this.inPlay[0].setAttribute('class',this.inPlay[0].suit)
    player1StackSize.innerHTML = `${player1.stack.length}`
    player2StackSize.innerHTML = `${player2.stack.length}`
    console.log(`${this.name} played the ${this.inPlay[0].rank} of ${this.inPlay[0].suit}`)
  }
}

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
  } else {
    console.log('something is broken')
  }
  player1StackSize.innerHTML = `${player1.stack.length}`
  player2StackSize.innerHTML = `${player2.stack.length}`
}

let warButton = document.querySelector('#warButton')
warButton.addEventListener('click', makeWar)
let onlyDeck = new Deck()
let player1 = new Player("player1", player1Rank, player1Suit)
let player2 = new Player("player2", player2Rank, player2Suit)

onlyDeck.shuffle()
player1.takeHalf(onlyDeck)
player2.takeHalf(onlyDeck)
player1StackSize.innerHTML = `${player1.stack.length}`
player2StackSize.innerHTML = `${player2.stack.length}`