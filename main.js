const net = require('net');
var readlineSync = require('readline-sync');
const UserManager = require('./user_manager.js');


const socket = net.connect(
    { host: 'localhost', port: 3000 }
    , () => {
        console.log(`Welcome to Wang's Blackjack`);
        main();
    }
);

const userManager = new UserManager(socket);

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

const main = () => {
    const userInfo = getUserInfo();
}
