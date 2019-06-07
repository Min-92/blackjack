module.exports = class Blackjack{
    constructor(argumentsObject){
        this.socket  = argumentsObject.socket;
        this.readlineSync = argumentsObject.readlineSync;
        this.userInfo = argumentsObject.userInfo;
        
        this.player = argumentsObject.player;
        this.dealer = argumentsObject.dealer;
        this.deck = argumentsObject.deck;
        this.bettingMoney = argumentsObject.bettingMoney;
    }

    shuffleDeck(deck){
        console.log('shuffling cards...');
        return this.dealer.shuffleDeck(deck);
    }
    printMoney(player){
        console.log(`${player.id}'s money : ${player.money}`);
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
        //todo : 메소드 이름 고민해보기
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
        return sum<21 ? this.player.choiceAction() : this.player.endTurn();
    }

    playGame(){
        this.deck.shuffleCardList();
        this.bettingMoney = this.player.betMoney();
        this.dealer.dealCards();
        this.printDealersHands(this.dealer);
        this.printHands(this.player);
        
        const nextStep = this.decideNextStep(this.player.hand);
        nextStep;


        
    }
}