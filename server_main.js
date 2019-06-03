const net = require('net');
const fs = require('fs');

class ServerMain{
    constructor(){
        this.userData;
    }
    createUserDataFile(){
        if(!fs.existsSync(`./data`)){
            fs.mkdirSync(`./data`);
        }
        fs.writeFileSync(`./data/userData.txt`,'','utf8');
        console.log('userData.txt has been created.');
    };

    parseData(data){
        const dataArray = data.split('$');
        const command = {};
        switch(dataArray[0]){
            case 'login' :
                command.action = 'login';
                command.id = dataArray[1];
                command.pw = dataArray[2];
        }
        return command;
    };

    updateUserData(){
        this.userdata = JSON.parse(fs.readFileSync('./data/userData.txt').toString());
    }

    login(command){
        this.updateUserData();
        const obj = {};
        return obj;
    }
    

}



const server = net.createServer((socket) =>{
    console.log('connected');
    const main = new ServerMain();

    socket.setEncoding('utf8');
    
    socket.on('data', (data) =>{
        if(!fs.existsSync(`./data/userData.txt`)){
            main.createUserDataFile(); 
        }
        console.log('received data : '+data);
        const command = main.parseData(data);
        const action = command.action;
        const sendingData = main[`${action}`](command);
        // global[`${action}`]();
        // this[`${action}Check`](...condition);

        
        // const command = JSON.stringify(parseData(data));
        socket.write(`${JSON.stringify(sendingData)}`);
    });

    socket.on('end', function(){
        console.log('disconnected');
    });

}).listen(3000);