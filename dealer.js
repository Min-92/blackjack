module.exports = class Dealer {
    constructor(deck,player,rule) {
        this.id = 'Dealer';
        this.hand = [];
        this.deck = deck;
        this.rule = rule;
        this.player = player;
    }

    dealCards() {
        let i = 0;
        while(i++ < 2){
            this.takeCard();
            this.player.takeCard();
        }
    }

    takeCard(){
        console.log(`${this.id} is taking card...`);
        this.hand.push(this.deck.dealCard());
    }

    choiceAction() {
        const sum = this.rule.countSum(this.hand);
        if (sum[1] >= 17 || sum[0] >= 17) {
            return false;
        }
        this.takeCard();
        return true;
    }

    returnCard(){
        this.deck.takeCard(this.hand.pop());
    }
    
    returnCards(){
        while(this.hand.length){
            this.returnCard();
        }
        while(this.player.hand.length){
            this.player.returnCard();
        }
    }


}