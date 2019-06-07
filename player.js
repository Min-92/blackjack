module.exports = class Player{
    constructor(userInfo,readlineSync,deck){
        this.readlineSync = readlineSync;

        this.id = userInfo.id;
        this.money = userInfo.money;
        this.hand = [];
        this.deck = deck;
    }

    betMoney(){
        const bettingMoney = Number(this.readlineSync.question(`베팅할 금액을 입력하세요. 소지금 : ${this.money}> `));
        if(bettingMoney > this.money){
            console.log(`베팅금액은 소지금보다 적어야합니다.`);
            this.betMoney(bettingMoney);
        }else{
            this.money -= bettingMoney;
            return bettingMoney;
        }
    }

    takeCard(){
        this.hand.push(this.deck.dealCard());
    }

}