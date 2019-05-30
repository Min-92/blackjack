const net = require('net');
const UserManager = require('./user_manager.js');

const socket = net.connect(
    { host: 'localhost', port: 3000 }
    , () => {
        console.log(`Welcome to Wang's Blackjack`);
    }
);

socket.on('data', (data) => {
    console.log(data.toString());
});




