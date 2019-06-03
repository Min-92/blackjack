const net = require('net');
const fs = require('fs');


const createUserDataFile = () =>{
    if(!fs.existsSync(`./data`)){
        fs.mkdirSync(`./data`);
    }
    fs.writeFileSync(`./data/userData.txt`,'','utf8');
    console.log('userData.txt has been created.');
}

const server = net.createServer((socket) =>{
    console.log('connected');
    socket.setEncoding('utf8');
    
    socket.on('data', (data) =>{
        if(!fs.existsSync(`./data/userData.txt`)){
            createUserDataFile(); 
        }
        console.log('received data : '+data);
        socket.write('false');
    });
    
    socket.on('end', function(){
        console.log('disconnected');
    });

}).listen(3000);