const getNewDeck = require('./deck.js');

module.exports = class Blackjack{
    constructor(player,socket,readlineSync){
        this.socket = socket;
        this.readlineSync = readlineSync;
        
        this.player = player;
        this.dealer;
        this.deck;
    }

    startGame(){
        this.deck = getNewDeck();

    }








}