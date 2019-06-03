const deck = [];

const suitList = ['◇','♧','♤','♡'];
const numberList = ['1','2','3','4','5','6','7','8','9','10','J','Q','K'];

class card {
    constructor(suit,number){
        this.suit = suit;
        this.number = number;
    }
}

module.exports = getNewDeck = () => {
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 13; j++){
            deck.push(new card(suitList[i],numberList[j]));
        }
    }
    return deck;
}

