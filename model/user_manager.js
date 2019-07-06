module.exports = class UserManager {
    constructor(socket, draw) {
        this.socket = socket;
        this.user = {};
        this.draw = draw;
    }

    async choiceAction() {
        const input = await this.draw.mainMenu();
        this.draw.removeBar();
        return this[input]();
    };

    getUserInfo() {
        return this.choiceAction();
    }

    inputData(question) {
        return this.readlineSync.question(`${question}`);
    }

    inputDataHide(question) {
        return this.readlineSync.question(`${question}`, { hideEchoBack: true });
    }

    getUserData() {
        return new Promise(resolve => {
            this.socket.on('data', (data) => {
                resolve(data.toString());
            });
        })

    }

    async login() {
        const tempUser = await this.draw.login();
        this.draw.removePrompt();
        this.socket.write(`login$${tempUser.id}$${tempUser.password}`);
        let result = JSON.parse(await this.getUserData());
        if (result === false) {
            this.draw.message('Invalid ID or Password.',3);
            result = await this.login();
        }
        this.socket.removeAllListeners();
        this.user = result;
        return this.user;
    }

    async signUp() {
        const tempUser = await this.draw.signUp();
        this.draw.removePrompt();
        let result;
        if (tempUser.password !== tempUser.password2) {
            this.draw.message('Incorrect password.',3);
            return result = await this.signUp();
        }
        this.socket.write(`signUp$${tempUser.id}$${tempUser.password}`);
        result = JSON.parse(await this.getUserData());
        if (result === false) {
            this.draw.message(`"${tempUser.id}" is already exist.`,3);
            result = await this.signUp();
        }
        this.socket.removeAllListeners();
        this.user = result;
        return this.user;
    }
};