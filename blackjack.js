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
    
    betMoney(player){
        this.bettingMoney = Number(this.readlineSync.question(`베팅할 금액을 입력하세요. 소지금 : ${player.money}> `));
        console.log(`Betting Money : ${this.bettingMoney}`);
        return player.money - this.bettingMoney;
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

        this.player.money = this.betMoney(this.player);

        



        // this.printPlayerMoney();
        
    }








}