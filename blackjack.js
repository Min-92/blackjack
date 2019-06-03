const getNewDeck = require('./deck.js');
const Dealer = require('./dealer.js');

module.exports = class Blackjack{
    constructor(player,socket,readlineSync){
        this.socket = socket;
        this.readlineSync = readlineSync;
        
        this.player = player;
        this.dealer;
        this.deck;
        this.bettingMoney;
    }

    shuffleDeck(){
        console.log('shuffling cards...');
        this.deck = this.dealer.shuffleDeck(this.deck);
    }
    printPlayerMoney(){
        console.log(`Your money : ${this.player.money}`);
    }
    
    betMoney(){
        this.bettingMoney = Number(this.readlineSync.question(`베팅할 금액을 입력하세요. 소지금 : ${this.player.money}> `));
        this.player.money -= this.bettingMoney;

    }

    startGame(){
        console.log('Start game!');
        this.deck = getNewDeck();
        this.dealer = new Dealer();
        this.shuffleDeck();

        this.betMoney();



        this.printPlayerMoney();
        
    }








}