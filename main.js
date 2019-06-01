const net = require('net');
const ReadLine = require('readline');
const UserManager = require('./user_manager.js');

const userManager = new UserManager;

const readLine = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const socket = net.connect(
    { host: 'localhost', port: 3000 }
    , () => {
        console.log(`Welcome to Wang's Blackjack`);
        main();
    }
);

socket.on('data', (data) => {
    console.log(data.toString());
});

const choiceAction = () => {
    return new Promise((resolve, reject) => {
        readLine.question(`input '1' or '2'\n< 1. log in >   < 2. sign up > `, (input) => {
            if(input){
                if(input !== '1' && input !== '2'){
                    console.log(`다시입력하세요.`);
                    choiceAction().then(doAction).catch(err => {
                        console.log('Error',err.message);
                    });
                }
                resolve(input);
            }
            reject(new Error("request is failed"));
        })
    });
};

const logIn = ()=>{
    return userManager.login();
}
const signUp = ()=>{
    return userManager.signUp();
}

const doAction = (action) =>{
    console.log('in do action');
    if(action === '1'){
        return logIn();
    }else if(action === '2'){
        return signUp();
    };
}

const getUserInfo = () =>{
    return choiceAction().then(doAction).catch(err => {
        console.log('Error',err.message);
    });
}

const main = () =>{
    const userInfo = getUserInfo();
}
