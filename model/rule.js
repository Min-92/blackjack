module.exports = class Rule{
    replaceNumber(character) {
        if (character === 'J' || character === 'Q' || character === 'K') {
            return [10];
        } else if (character == 'A') {
            return [1, 11];
        }
        return [Number(character)];
    }

    countSum(hand) {
        //todo : 메소드 이름 고민해보기
        let sum = [0, 0];
        let number;
        for (let value of hand) {
            number = this.replaceNumber(value.number);
            if (number.length === 2) {
                if (sum[1] !== 0) {
                    sum[0] += number[0];
                    sum[1] += number[0];
                } else {
                    sum[1] = sum[0] + number[1];
                    sum[0] += number[0];
                }
            } else {
                if (sum[1] !== 0) {
                    sum[0] += number[0];
                    sum[1] += number[0];
                } else {
                    sum[0] += number[0];
                }
            }
        }
        return sum;
    }

    decideResult(playerHand, dealerHand){
        let playerSum = this.countSum(playerHand);
        let dealerSum = this.countSum(dealerHand);

        if(playerSum[1] > 21 || playerSum[1] === 0){
            playerSum = playerSum[0];
        }else{
            playerSum = playerSum[1];
        }
        
        if(dealerSum[1] > 21 || dealerSum[1] === 0){
            dealerSum = dealerSum[0];
        }else{
            dealerSum = dealerSum[1];
        }

        if(playerSum > 21){
            return 'lose'
        }
        if(dealerSum > 21){
            return 'win'
        }
        if(playerSum > dealerSum){
            return 'win'
        }
        if(playerSum < dealerSum){
            return 'lose'
        }
        return 'push';
    }

}