module.exports = class ServerUserManager {
    constructor(fs){
        this.fs = fs;
        this.userData = {};
    }

    async createUserDataFile() {
        const fileExist = await this.myExistFile(__dirname+`/../data`);
        if (!fileExist) {
            this.myMkdir(__dirname+`/../data`);
        }
        await this.myWriteFile(__dirname+`/../data/userData.txt`, '{}', 'utf8');
    };

    async updateUserData() {
        const dataString = await this.myReadFile((__dirname+'/../data/userData.txt').toString());
        if(dataString) this.userData = JSON.parse(dataString);
    }

    isMember(command) {
        if(command.id in this.userData){
            if(this.userData[command.id].pw === command.pw) return this.userData[command.id]
        }
        return false;
    }

    login(command) {
        const result = this.isMember(command);
        if (result) {
            console.log(`${result.id} is loged in.`);
        }
        return result;
    }

    async writeUserData(id) {
        const tempUserData = this.userData;
        await this.updateUserData();
        this.userData[id] = tempUserData[id];
        await this.myWriteFile(__dirname+'/../data/userData.txt', JSON.stringify(this.userData), 'utf8');
    }

    async signUp(command) {
        if (this.isMember(command) !== false) {
            return false;
        };
        const tempUser = {
            id: command.id,
            pw: command.pw,
            money: 1000
        }
        this.userData[tempUser.id] = tempUser;
        await this.writeUserData(command.id);
        return tempUser;
    }

    async updateMoney(command){
        this.userData[command.id].money = command.money;
        await this.writeUserData(command.id);
    }


    myReadFile(path) {
        return new Promise(resolve => {
            this.fs.readFile(path, 'utf8', (err, data) => {
                resolve(data);
            });
        });
    }

    myWriteFile(path, userData, option) {
        return new Promise(resolve => {
            this.fs.writeFile(path, userData, option, (err, data) => {
                resolve();
            });
        })
    }

    myExistFile(path) {
        return new Promise(resolve => {
            this.fs.stat(path, (err, stats) => {
                resolve(stats);
            });
        });
    }

    myMkdir(path){
        return new Promise(resolve => {
            resolve(this.fs.mkdir(path, {recursive : true}, (err) => {
                if(err) throw err;
            }));
        });
    }




}