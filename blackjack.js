const getNewDeck = require('./deck.js');
const Dealer = require('./dealer.js');
const Player = require('./player.js');

module.exports = class Blackjack{
    constructor(user,socket,readlineSync){
        this.socket = socket;
        this.readlineSync = readlineSync;
        this.userInfo = userInfo;
        
        this.player;
        this.dealer;
        this.deck;
        this.bettingMoney;
    }

    shuffleDeck(deck){
        console.log('shuffling cards...');
        return this.dealer.shuffleDeck(deck);
    }
    printPlayerMoney(){
        console.log(`Your money : ${this.player.money}`);
    }

    initObjects(){
        this.deck = getNewDeck();
        this.dealer = new Dealer();
        this.player = new Player(this.userInfo,this.readlineSync);
    }

    startGame(){
        console.log('Start game!');
        this.initObjects();
        this.deck = this.shuffleDeck(this.deck);

        this.dealCards();

        this.bettingMoney = this.player.betMoney(this.bettingMoney);

        



        this.printPlayerMoney();
        
    }








}