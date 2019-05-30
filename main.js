const net = require('net');
const ReadLine = require('net');
const UserManager = require('./user_manager.js');

const readLine = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const socket = net.connect(
    { host: 'localhost', port: 3000 }
    , () => {
        console.log(`Welcome to Wang's Blackjack`);
    }
);

socket.on('data', (data) => {
    console.log(data.toString());
});


const choiceAction = () =>{
    console.log(`       input '1' or '2'\n  < 1. log in >   < 2. sign up >`);
    readLine.on("line", line => {
        if(line === '1'){
            logIn();
        }if(line === '2'){
            signUp();
        }else{
            console.log(`다시입력하세요`);
            choiceAction();
        };
    }).on("close", () => {
        process.exit();
    });
}

const logIn = ()=>{
    const user = UserManager.login();
}
const signUp = ()=>{
    const user = UserManager.signUp();
}


