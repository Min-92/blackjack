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



