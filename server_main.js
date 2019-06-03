const net = require('net');
const fs = require('fs');


const server = net.createServer((socket) =>{
    console.log('connected');
    socket.setEncoding('utf8');
    
    socket.on('data', (data) =>{
        console.log('received data : '+data);
        socket.write('false');
    });
    socket.on('end', function(){
        console.log('disconnected');
    });

}).listen(3000);