module.exports = class ServerUserManager {
    constructor(fs){
        this.fs = fs;
        this.userData = {};
    }

    createUserDataFile() {
        if (!this.fs.existsSync(`./data`)) {
            this.fs.mkdirSync(`./data`);
        }
        this.fs.writeFileSync(`./data/userData.txt`, '{}', 'utf8');
        console.log('userData.txt has been created.');
    };

    updateUserData() {
        this.userData = JSON.parse(this.fs.readFileSync('./data/userData.txt').toString());
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

    writeUserData() {
        this.fs.writeFileSync('./data/userData.txt', JSON.stringify(this.userData));
    }

    signUp(command) {
        if (this.isMember(command) !== false) {
            return false;
        };
        const tempUser = {
            id: command.id,
            pw: command.pw,
            money: 1000
        }
        this.userData[tempUser.id] = tempUser;
        this.writeUserData();
        console.log(`member ID '${tempUser.id}' is signed up.`);
        return tempUser;
    }

    updateMoney(command){
        this.userData[command.id].money = command.money;
        this.writeUserData();
    }


}