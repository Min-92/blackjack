module.exports = class Dealer {
    constructor(deck,player,rule,draw) {
        this.id = 'Dealer';
        this.hand = [];
        this.deck = deck;
        this.rule = rule;
        this.player = player;
        this.draw = draw;
    }

    dealCards() {
        let i = 0;
        while(i++ < 2){
            this.takeCard();
            this.player.takeCard();
        }
    }

    takeCard(){
        this.hand.push(this.deck.dealCard());
    }

    printHands(option){
        let sum;
        if(option === 'hide'){
            this.draw.printDealerHandsHide(this.hand[0]);
            sum = this.rule.countSum([this.hand[0]]);
        }else{
            this.draw.printDealerHands(this.hand);
            sum = this.rule.countSum(this.hand);
        }
        if(sum[1] === 0 || sum[1] > 21){
            this.draw.setDealerSum(sum[0]);
        }else{
            this.draw.setDealerSum(sum);
        }
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