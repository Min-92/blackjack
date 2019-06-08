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

    choiceRestart(){
        const result = this.readlineSync.question("Play again?\n< 1. Yes > < 2. No > ")
        if(result !== '1' && result !== '2') {
            console.log('다시 입력해주세요.');
            return this.choiceRestart();
        }
            return result === '1' ? true : false
    }

    finishGame(result){
        if(result === 'win'){
            this.player.money += this.bettingMoney.rewardMoney();
            this.socket.write(`updateMoney$${this.player.id}$${this.player.money}`);
            console.log(`Get reward!`);
            this.printMoney(this.player);
        }else{
            this.socket.write(`updateMoney$${this.player.id}$${this.player.money}`);
            this.bettingMoney.takeMoney();
            this.printMoney(this.player);
        }
        return this.choiceRestart();
    }

    playGame(){
        this.deck.shuffleCardList();
        this.bettingMoney.amount = this.player.betMoney();
        this.dealer.dealCards();
        this.printDealersHands(this.dealer);
        this.printHands(this.player);
        
        this.waitTargetsTurn(this.player);
        this.printHands(this.dealer);
        this.waitTargetsTurn(this.dealer);

        const result = this.rule.decideResult(this.player.hand, this.dealer.hand);
        console.log(`${result}!`);
        this.dealer.returnCards();
        return this.finishGame(result);
    }
}