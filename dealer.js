module.exports = class Dealer{
    constructor(){
        this.hand;
    }
    shuffleDeck(deck){
        const newDeck = Array.from(deck);
        for(let i = newDeck.length -1; i > 0 ; i--){
            const randomIndex = Math.floor(Math.random()*(i+1));
            const randomCard = newDeck[i];
            newDeck[i] = newDeck[randomIndex];
            newDeck[randomIndex] = randomCard;
        }
        return newDeck;
    }    


}