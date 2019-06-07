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

}