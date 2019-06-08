const net = require('net');
const fs = require('fs');

class ServerMain {
    constructor() {
        this.userData;
    }
    createUserDataFile() {
        if (!fs.existsSync(`./data`)) {
            fs.mkdirSync(`./data`);
        }
        fs.writeFileSync(`./data/userData.txt`, '{}', 'utf8');
        console.log('userData.txt has been created.');
    };

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

    isMember(command) {
        if(command.id in this.userData){
            if(this.userData[command.id].pw === command.pw) return this.userData[command.id]
        }
        // for (let value of this.userData) {
        //     if (value.id === command.id && value.pw === command.pw) {
        //         return value;
        //     }
        // }
        return false;
    }

    updateUserData() {
        this.userData = JSON.parse(fs.readFileSync('./data/userData.txt').toString());
    }

    writeUserData() {
        fs.writeFileSync('./data/userData.txt', JSON.stringify(this.userData));
    }

    login(command) {
        this.updateUserData();
        const result = this.isMember(command);
        if (result) {
            console.log(`${result.id} is loged in.`);
        }
        return result;
    }

    signUp(command) {
        this.updateUserData();
        if (this.isMember(command) !== false) {
            return false;
        };
        const tempUser = {
            id: command.id,
            pw: command.pw,
            money: 1000
        }
        this.userData[tempUser.id] = tempUser;
        // this.userData.push(tempUser);
        this.writeUserData();
        console.log(`member ID '${tempUser.id}' is signed up.`);
        return tempUser;
    }

    updateMoney(command){
        for (let key of this.userData) {
            if (this.userData[key].id === command.id) {
                this.userData[key].money = command.money;
            }
        }
        this.writeUserData();
    }
}



const server = net.createServer((socket) => {
    console.log('connected');
    const main = new ServerMain();

    socket.setEncoding('utf8');

    socket.on('data', (data) => {
        if (!fs.existsSync(`./data/userData.txt`)) {
            main.createUserDataFile();
        }
        console.log('received data : ' + data);
        const command = main.parseData(data);
        const action = command.action;
        const sendingData = main[`${action}`](command);

        socket.write(`${JSON.stringify(sendingData)}`);
    });

    socket.on('end', function () {
        console.log('disconnected');
    });

}).listen(3000);