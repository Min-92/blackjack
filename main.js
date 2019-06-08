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

const initObjects = (userInfo) => {
    const bettingMoney = new BettingMoney();
    const deck = new Deck();
    deck.getNewDeck();
    const rule = new Rule()
    const player = new Player(userInfo, readlineSync, deck, rule);
    const dealer = new Dealer(deck, player, rule);
    const argumentsObject = {
        player, dealer, bettingMoney, deck, socket, readlineSync, rule
    }
    return new Blackjack(argumentsObject);
}

const main = async() => {
    const userInfo = await userManager.getUserInfo();
    const blackjack = initObjects(userInfo);
    console.log('Start game!');
    let restart = true;
    while(restart){
        restart = blackjack.playGame();
    }
}
