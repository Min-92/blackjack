module.exports = class UserManager{
    constructor(socket, readlineSync){
        this.socket = socket;
        this.readlineSync = readlineSync;
        this.user = {};
    }

    inputData(question){
        return this.readlineSync.question(`${question}`);
    }
    
    inputDataHide(question){
        return this.readlineSync.question(`${question}`, {hideEchoBack: true});
    }

    getUserData(){
        return new Promise(resolve =>{
            this.socket.on('data', (data) =>{
                resolve(data.toString());
            });
        })

    }

    async login() {
        const tempUser = {};
        tempUser.id = this.inputData('Please input your ID> ');
        tempUser.password = this.inputDataHide('Please input your password> ');
        this.socket.write(`login$${tempUser.id}$${tempUser.password}`);
        const result = await this.getUserData();
        if(result === 'false'){
            console.log('ID 나 password 가 올바르지 않습니다.');
            await this.login();
        }
        this.socket.removeAllListeners();
        this.user.id = tempUser.id;
        this.user.password = tempUser.password;
        return this.user;
    }

    signUp(){
        console.log('in user manager signup');
        return 0;
    }
};