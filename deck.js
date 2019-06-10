const suitList = ['◆','♣','♠','♥'];
const numberList = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

class card {
    constructor(suit,number){
        this.suit = suit;
        this.number = number;
    }
}

module.exports = class Deck {
    constructor(){
        this.cardList = [];
    }

    getNewDeck(){
        const newDeck = [];
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 13; j++){
                newDeck.push(new card(suitList[i],numberList[j]));
            }
        }
        this.cardList = newDeck;
    }

    shuffleCardList(){
        // console.log('shuffling cards...');
        const newDeck = [...this.cardList];
        for(let i = newDeck.length -1; i > 0 ; i--){
            const randomIndex = Math.floor(Math.random()*(i+1));
            const randomCard = newDeck[i];
            newDeck[i] = newDeck[randomIndex];
            newDeck[randomIndex] = randomCard;
        }
        this.cardList = newDeck;
    }

    drawCard(){
        return this.cardList.pop();
    }

    dealCard(){
        return this.drawCard();
    }

    takeCard(card){
        this.cardList.push(card);
    }
}