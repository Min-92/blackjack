module.exports = class BettingMoney{
    constructor(){
        this.amount = 0;
    }

    rewardMoney(){
        const reward = this.amount*2;
        this.amount = 0;
        return reward;
    }

    takeMoney(){
        this.amount = 0; 
    }


}