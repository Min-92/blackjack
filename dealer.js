module.exports = class Dealer {
    constructor(deck,player) {
        this.id = 'Dealer';
        this.hand = [];
        this.deck = deck;
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
        this.hand.push(this.deck.dealCard());
    }


}