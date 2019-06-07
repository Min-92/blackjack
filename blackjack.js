module.exports = class Blackjack{
    constructor(argumentsObject){
        this.socket  = argumentsObject.socket;
        this.readlineSync = argumentsObject.readlineSync;
        this.rule = argumentsObject.rule;
        this.player = argumentsObject.player;
        this.dealer = argumentsObject.dealer;
        this.deck = argumentsObject.deck;
        this.bettingMoney = argumentsObject.bettingMoney;
    }

    printMoney(player){
        console.log(`${player.id}'s money : ${player.money}`);
    }

    printHands(player){
        process.stdout.write(`${player.id}'s hands : `);
        for(let value of player.hand){
            process.stdout.write(`[${value.suit}  ${value.number}] `);
        }
        console.log(` sum : ${this.rule.countSum(player.hand)}`);
    }

    printDealersHands(dealer){
        process.stdout.write(`${dealer.id}'s hands : `);
        process.stdout.write(`[${dealer.hand[0].suit}  ${dealer.hand[0].number}] `);
        process.stdout.write(`[    ] `);
        console.log(` sum : ${this.rule.countSum([dealer.hand[0]])}`);
    }

    decideNextStep(hand){
        const sum = this.rule.countSum(hand);
        return sum<21 ? this.player.choiceAction() : this.player.endTurn();
    }

    waitTargetsTurn(targetPlayer){
        let endturn = true;
        while(endturn){
            endturn = targetPlayer.choiceAction();
            this.printHands(targetPlayer);

        }
    }

    playGame(){
        this.deck.shuffleCardList();
        this.bettingMoney = this.player.betMoney();
        this.dealer.dealCards();
        this.printDealersHands(this.dealer);
        this.printHands(this.player);
        
        this.waitTargetsTurn(this.player);


        
    }
}