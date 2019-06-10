const net = require('net');
const UserManager = require('./user_manager.js');
const Blackjack = require('./blackjack.js');
const Dealer = require('./dealer.js');
const Player = require('./player.js');
const Deck = require('./deck.js');
const Rule = require('./rule.js');
const BettingMoney = require('./betting_money.js');
const Draw = require('./draw.js');

const socket = net.connect(
    { host: 'localhost', port: 3000 }
    , () => {
        main();
    }
);

const draw = new Draw();

const userManager = new UserManager(socket, draw);

const initObjects = (userInfo) => {
    const bettingMoney = new BettingMoney();
    const deck = new Deck();
    deck.getNewDeck();
    const rule = new Rule()
    const player = new Player(userInfo, deck, rule, draw);
    const dealer = new Dealer(deck, player, rule, draw);
    const argumentsObject = {
        player, dealer, bettingMoney, deck, socket, rule, draw
    }
    return new Blackjack(argumentsObject);
}

const main = async () => {
    draw.setScreen();
    const userInfo = await userManager.getUserInfo();
    draw.removePrompt();
    draw.removeBox();
    const blackjack = initObjects(userInfo);
    blackjack.startGame();
}