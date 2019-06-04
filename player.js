module.exports = class player{
    constructor(userInfo,readlineSync){
        this.readlineSync = readlineSync;

        this.id = userInfo.id;
        this.money = userInfo.money;
        this.hand = [];
    }

    betMoney(bettingMoney){
        bettingMoney = Number(this.readlineSync.question(`베팅할 금액을 입력하세요. 소지금 : ${this.money}> `));
        if(bettingMoney > this.money){
            console.log(`베팅금액은 소지금보다 작아야합니다. 소지금 : ${this.money}> `);
            this.betMoney(bettingMoney);
        }else{
            this.money -= bettingMoney;
            return bettingMoney;
        }
    }


}