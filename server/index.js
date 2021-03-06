const net = require('net');
const fs = require('fs');
const ServerUserManager = require('./userManager');

class ServerMain {
    constructor(serverUserManager) {
        this.serverUserManager = serverUserManager;
    }

    parseData(data) {
        const dataArray = data.split('$');
        const command = {};
        command.action  = dataArray[0];
        switch (dataArray[0]) {
            case 'login': case 'signUp':
                command.id = dataArray[1];
                command.pw = dataArray[2];
                return command;
            case 'updateMoney':
                command.id = dataArray[1];
                command.money = dataArray[2];
                return command;
            default:
                return;
        }
    }

    async login(command) {
        return await this.serverUserManager.login(command);
    }

    async signUp(command) {
        return await this.serverUserManager.signUp(command);
    }

    async updateMoney(command){
        await this.serverUserManager.updateMoney(command);
    }
}



const server = net.createServer((socket) => {
    console.log('connected');
    const serverUserManager = new ServerUserManager(fs);
    const serverMain = new ServerMain(serverUserManager);

    socket.setEncoding('utf8');

    socket.on('data', async (data) => {
        if (!fs.existsSync(__dirname+`/../data/userData.txt`)) {
            serverUserManager.createUserDataFile();
        }
        await serverMain.serverUserManager.updateUserData();
        console.log('received data : ' + data);
        const command = serverMain.parseData(data);
        const action = command.action;
        const sendingData = await serverMain[`${action}`](command);
        
        if(sendingData !== undefined) socket.write(`${JSON.stringify(sendingData)}`);
    });

    socket.on('end', function () {
        console.log('disconnected');
    });

}).listen(3000);