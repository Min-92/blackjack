const net = require('net');

const server = net.createServer((socket) =>{
    console.log('connected');
    socket.setEncoding('utf8');
    
    socket.on('data', (data) =>{
        console.log('received data : '+data);
    });

}).listen(3000);