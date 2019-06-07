const net = require('net');
const readlineSync = require('readline-sync');
const UserManager = require('./user_manager.js');
const Blackjack = require('./blackjack.js');
const Dealer = require('./dealer.js');
const Player = require('./player.js');
const Deck = require('./deck.js');
const Rule = require('./rule.js');
const BettingMoney = require('./betting_money.js');

const socket = net.connect(
    { host: 'localhost', port: 3000 }
    , () => {
        console.log(`Welcome to Wang's Blackjack`);
        main();
    }
);

const userManager = new UserManager(socket,readlineSync);
const choiceAction = () => {
    let input = readlineSync.question(`input '1' or '2'\n< 1. log in >   < 2. sign up > `);
    if (input !== '1' && input !== '2') {
        console.log(`다시입력하세요.`);
        choiceAction()
    }else{
        return doAction(input);
    }
};

const logIn = () => {
    return userManager.login();
}
const signUp = () => {
    return userManager.signUp();
}

const doAction = (action) => {
    if (action === '1') {
        return logIn();
    } else if (action === '2') {
        return signUp();
    };
}

const getUserInfo = () => {
    return choiceAction();
}

const initObjects = (userInfo) => {
    const bettingMoney = new BettingMoney();
    const deck = new Deck();
    deck.getNewDeck();
    const rule = new Rule()
    const player = new Player(userInfo, readlineSync, deck, rule);
    const dealer = new Dealer(deck, player, rule);
    const argumentsObject = {
        player,
        dealer,
        bettingMoney,
        deck,
        socket,
        readlineSync,
        rule
    }
    return new Blackjack(argumentsObject);
}

const main = async() => {
    const userInfo = await getUserInfo();
    const blackjack = initObjects(userInfo);
    console.log('Start game!');
    blackjack.playGame();
}
