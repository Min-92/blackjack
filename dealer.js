module.exports = class Dealer{
    constructor(){
        this.id = 'Dealer';
        this.hand = [];
    }
    shuffleDeck(deck){
        const newDeck = [...deck];
        for(let i = newDeck.length -1; i > 0 ; i--){
            const randomIndex = Math.floor(Math.random()*(i+1));
            const randomCard = newDeck[i];
            newDeck[i] = newDeck[randomIndex];
            newDeck[randomIndex] = randomCard;
        }
        return newDeck;
    }
    
    dealCard(targetPlayer,deck){
        targetPlayer.hand.push(deck.pop());
        return [targetPlayer,deck];
    }


}