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
        const sum = this.rule.countSum(player.hand);
        if(sum[1] === 0 || sum[1] > 21){
            console.log(` sum : ${sum[0]}`);
        }else{
            console.log(` sum : ${sum}`);
        }
    }

    printDealersHands(dealer){
        process.stdout.write(`${dealer.id}'s hands : `);
        process.stdout.write(`[${dealer.hand[0].suit}  ${dealer.hand[0].number}] `);
        process.stdout.write(`[    ] `);
        const sum = this.rule.countSum([dealer.hand[0]]);
        if(sum[1] === 0 || sum[1] > 21){
            console.log(` sum : ${sum[0]}`);
        }else{
            console.log(` sum : ${sum}`);
        }
    }

    waitTargetsTurn(targetPlayer){
        let endturn = true;
        while(endturn){
            endturn = targetPlayer.choiceAction();
            if(endturn === true) this.printHands(targetPlayer);
        }
    }

    playGame(){
        this.deck.shuffleCardList();
        this.bettingMoney = this.player.betMoney();
        this.dealer.dealCards();
        this.printDealersHands(this.dealer);
        this.printHands(this.player);
        
        this.waitTargetsTurn(this.player);
        this.printHands(this.dealer);
        this.waitTargetsTurn(this.dealer);

        
    }
}