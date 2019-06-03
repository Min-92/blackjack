const net = require('net');
const fs = require('fs');

const createUserDataFile = () =>{
    if(!fs.existsSync(`./data`)){
        fs.mkdirSync(`./data`);
    }
    fs.writeFileSync(`./data/userData.txt`,'','utf8');
    console.log('userData.txt has been created.');
}

const parseData = (data) => {
    const dataArray = data.split('$');
    const command = {};
    switch(dataArray[0]){
        case 'login' :
            command.action = 'login';
            command.id = dataArray[1];
            command.pw = dataArray[2];
    }
    return command;
}

const server = net.createServer((socket) =>{
    console.log('connected');
    socket.setEncoding('utf8');
    
    socket.on('data', (data) =>{
        if(!fs.existsSync(`./data/userData.txt`)){
            createUserDataFile(); 
        }
        console.log('received data : '+data);
        const command = JSON.stringify(parseData(data));

        socket.write(`${command}`);
    });

    socket.on('end', function(){
        console.log('disconnected');
    });

}).listen(3000);