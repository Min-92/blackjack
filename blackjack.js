const getNewDeck = require('./deck.js');
const Dealer = require('./dealer.js');

module.exports = class Blackjack{
    constructor(player,socket,readlineSync){
        this.socket = socket;
        this.readlineSync = readlineSync;
        
        this.player = player;
        this.dealer;
        this.deck;
    }

    shuffleDeck(){
        this.deck = this.dealer.shuffle(this.deck);
    }

    startGame(){
        this.deck = getNewDeck();
        this.dealer = new Dealer();
        shuffleDeck();
        
    }








}