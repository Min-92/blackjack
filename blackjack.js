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

    dealCards(deck){
        console.log('dealing cards...');
        [this.player,deck] = this.dealer.dealCard(this.player,deck);
        [this.dealer,deck] = this.dealer.dealCard(this.dealer,deck);
        [this.player,deck] = this.dealer.dealCard(this.player,deck);
        [this.dealer,deck] = this.dealer.dealCard(this.dealer,deck);
    }

    printHands(player){
        process.stdout.write(`${player.id}'s hands : `);
        for(let value of player.hand){
            process.stdout.write(`[${value.suit}  ${value.number}] `);
        }
        console.log(` sum : ${this.countSum(player.hand)}`);
    }

    printDealersHands(dealer){
        process.stdout.write(`${dealer.id}'s hands : `);
        process.stdout.write(`[${dealer.hand[0].suit}  ${dealer.hand[0].number}] `);
        process.stdout.write(`[    ] `);
        console.log(` sum : ${this.countSum([dealer.hand[0]])}`);
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
            number = this.replaceNumber(value.number);
            if (number.length === 2) {
                if (sum[1] !== 0) {
                    sum[0] += number[0];
                    sum[1] += number[0];
                } else {
                    sum[1] = sum[0] + number[1];
                    sum[0] += number[0];
                }
            } else {
                if (sum[1] !== 0) {
                    sum[0] += number[0];
                    sum[1] += number[0];
                } else {
                    sum[0] += number[0];
                }
            }
        }
        if (sum[1] === 0 || sum[1] > 22) {
            return [sum[0]];
        } else {
            return sum;
        }
    }

    decideNextStep(hand){
        const sum = this.countSum(hand);
        
        
    }

    playGame(){
        this.initObjects();
        this.table.deck = this.shuffleDeck(this.table.deck);
        
        this.table.money = this.player.betMoney(this.table.money);
        this.dealCards(this.table.deck);
        this.printDealersHands(this.dealer);
        this.printHands(this.player);
        this.printMoney(this.table);
        
        const nextStep = this.decideNextStep(this.player.hand);

        // this.choiceAction(this.player);



        
    }








}