module.exports = class Blackjack {
    constructor(argumentsObject) {
        this.socket = argumentsObject.socket;
        this.rule = argumentsObject.rule;
        this.player = argumentsObject.player;
        this.dealer = argumentsObject.dealer;
        this.deck = argumentsObject.deck;
        this.bettingMoney = argumentsObject.bettingMoney;
        this.draw = argumentsObject.draw;
    }

    printMoney(player) {
        console.log(`${player.id}'s money : ${player.money}`);
    }


    waitPlayersTurn() {
        return new Promise(resolve => {
            return resolve(this.player.choiceAction());
        });
    }

    waitDealersTurn() {
        let endturn = true;
        while (endturn) {
            endturn = this.dealer.choiceAction();
        }
    }

    async choiceRestart() {
        return await this.draw.choiceRestart();
    }

    finishGame(result) {
        if (result === 'win') {
            this.player.money += this.bettingMoney.rewardMoney();
            this.socket.write(`updateMoney$${this.player.id}$${this.player.money}`);
        } else {
            this.socket.write(`updateMoney$${this.player.id}$${this.player.money}`);
            this.bettingMoney.takeMoney();
        }
    }

    async topUpMoney() {
        return await this.draw.topUpMoney();
    }

    async startGame() {
        let restart = true;
        while (restart) {
            if (!Number(this.player.money)) {
                this.player.money = await this.topUpMoney();
                if (!this.player.money) break;
            }
            await this.playGame();
            restart = await this.draw.choiceRestart();
        }
        this.draw.gameOver();
    }

    async playGame() {
        this.draw.blackjackTable(this.player.money);
        this.deck.shuffleCardList();
        this.bettingMoney.amount = await this.player.betMoney();
        this.dealer.dealCards();
        this.dealer.printHands('hide');
        this.player.printHands();

        await this.waitPlayersTurn();
        this.waitDealersTurn();
        this.dealer.printHands();

        const result = this.rule.decideResult(this.player.hand, this.dealer.hand);
        this.draw.message(`\n     {bold}${result}!{/bold}     \n`, -1);
        this.dealer.returnCards();
        this.draw.removeChips();
        return this.finishGame(result);
    }
}