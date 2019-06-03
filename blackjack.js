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
        console.log('shuffling cards...');
        this.deck = this.dealer.shuffleDeck(this.deck);
    }
    printPlayerMoney(){
        console.log(`Your money : ${this.player.money}`);
    }
    

    startGame(){
        console.log('Start game!');
        this.deck = getNewDeck();
        this.dealer = new Dealer();
        this.shuffleDeck();
        this.printPlayerMoney();
        
    }








}