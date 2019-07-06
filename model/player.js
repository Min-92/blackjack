module.exports = class Player {
    constructor(userInfo, deck, rule, draw) {
        this.id = userInfo.id;
        this.money = userInfo.money;
        this.hand = [];
        this.deck = deck;
        this.rule = rule;
        this.draw = draw;
    }

    async betMoney() {
        let bettingMoney = await this.draw.bettingBar(this.money);
        if (bettingMoney > this.money) {
            bettingMoney = this.money;
        }
        this.money -= bettingMoney;
        this.draw.money(this.money);
        this.draw.removeBar(); 
        return bettingMoney;
    }

    takeCard() {
        this.hand.push(this.deck.dealCard());
    }

    returnCard() {
        this.deck.takeCard(this.hand.pop());
    }

    printHands() {
        this.draw.printHands(this.hand);
        const sum = this.rule.countSum(this.hand);
        if (sum[1] === 0 || sum[1] > 21) {
            this.draw.setPlayerSum(sum[0]);
        } else {
            this.draw.setPlayerSum(sum);
        }
    }

    async choiceAction() {
        let sum = this.rule.countSum(this.hand);
        if (sum[0] >= 21 || sum[1] === 21) {
            return;
        }
        const action = await this.draw.choiceAction();
        if (action === 'hit') {
            this.draw.setMessage(`\n     {bold}Hit!{/bold}     \n`, 1);
            this.takeCard();
            this.printHands();
            return this.choiceAction();
        } else {
            this.draw.setMessage(`\n     {bold}Stay{/bold}     \n`, 1);
            return;
        }
    }
}