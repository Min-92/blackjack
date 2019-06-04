const getNewDeck = require('./deck.js');
const Dealer = require('./dealer.js');
const Player = require('./player.js');
const Table = require('./table.js');

module.exports = class Blackjack{
    constructor(userInfo,socket,readlineSync){
        this.socket = socket;
        this.readlineSync = readlineSync;
        this.userInfo = userInfo;
        
        this.player;
        this.dealer;
        this.table;
    }

    shuffleDeck(deck){
        console.log('shuffling cards...');
        return this.dealer.shuffleDeck(deck);
    }
    printMoney(player){
        console.log(`${player.id}'s money : ${player.money}`);
    }

    initObjects(){
        this.dealer = new Dealer();
        this.player = new Player(this.userInfo,this.readlineSync);
        this.table = new Table(getNewDeck());
    }

    dealCards(){
        [this.player,this.table.deck] = this.dealer.dealCard(this.player,this.table.deck);
        [this.dealer,this.table.deck] = this.dealer.dealCard(this.dealer,this.table.deck);
        [this.player,this.table.deck] = this.dealer.dealCard(this.player,this.table.deck);
        [this.dealer,this.table.deck] = this.dealer.dealCard(this.dealer,this.table.deck);
    }

    printHands(player){
        process.stdout.write(`${player.id}'s hands : `);
        for(let value of player.hand){
            process.stdout.write(`${value.suit}  ${value.number} `);
        }
        console.log(` sum : ${this.countSum(player.hand)}`);
    }

    replaceNumber(character) {
        if (character === 'J' || character === 'Q' || character === 'K') {
            return [10];
        } else if (character == 'A') {
            return [1, 11];
        }
        return [Number(character)];
    }

    countSum(hand) {
        let sum = [0, 0];
        let number;
        for (let value of hand) {
            if (sum[0] === 0) {
                number = this.replaceNumber(value.number);
                for (let i = 0; i < number.length; i++) {
                    sum[i] += number[i];
                }
            } else if (sum[1] === 0) {
                number = this.replaceNumber(value.number);
                if (number.length > 1) {
                    sum[1] = sum[0] + number[1];
                    sum[0] += number[0];
                } else {
                    sum[0] += number[0];
                }
            } else {
                sum[0] += number[0];
                sum[1] += number[0];
            }
        }
        if (sum[1] === 0) {
            return [sum[0]];
        } else {
            return sum;
        }
    }

    startGame(){
        console.log('Start game!');
        this.initObjects();
        this.table.deck = this.shuffleDeck(this.table.deck);
        
        this.table.money = this.player.betMoney(this.table.money);
        this.dealCards();
        this.printHands(this.dealer);
        this.printHands(this.player);
        



        this.printMoney(this.table);
        
    }








}