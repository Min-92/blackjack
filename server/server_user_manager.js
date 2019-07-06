module.exports = class ServerUserManager {
    constructor(fs){
        this.fs = fs;
        this.userData = {};
    }

    async createUserDataFile() {
        const fileExist = await this.myExistFile(`../data`);
        if (!fileExist) {
            // this.fs.mkdirSync(`../data`);
            this.myMkdir(`../data`);
        }
        await this.myWriteFile(`../data/userData.txt`, '{}', 'utf8');
        // this.fs.writeFileSync(`../data/userData.txt`, '{}', 'utf8');
    };

    async updateUserData() {
        const dataString = await this.myReadFile(('../data/userData.txt').toString());
        this.userData = JSON.parse(dataString);
        // this.userData = JSON.parse(this.fs.readFileSync('../data/userData.txt').toString());
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
        await this.myWriteFile('../data/userData.txt', JSON.stringify(this.userData));
        // this.fs.writeFileSync('../data/userData.txt', JSON.stringify(this.userData));
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
        console.log(`member ID '${tempUser.id}' is signed up.`);
        return tempUser;
    }

    async updateMoney(command){
        this.userData[command.id].money = command.money;
        await this.writeUserData(command.id);
    }


    myReadFile(path) {
        return new Promise(resolve => {
            this.fs.readFile(path, (err, data) => {
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
            resolve(this.fs.midkr(path, {recursive : true}, (err) => {
                if(err) throw err;
            }));
        });
    }




}