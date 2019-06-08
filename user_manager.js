module.exports = class UserManager{
    constructor(socket, readlineSync){
        this.socket = socket;
        this.readlineSync = readlineSync;
        this.user = {};
    }

    choiceAction(){
        let input = this.readlineSync.question(`input '1' or '2'\n< 1. log in >   < 2. sign up > `);
        if (input !== '1' && input !== '2') {
            console.log(`다시입력하세요.`);
            return this.choiceAction()
        }else{
            return this.doAction(input);
        }
    };
    
    doAction(action){
        if (action === '1') {
            return this.login();
        } else if (action === '2') {
            return this.signUp();
        };
    }
    
    getUserInfo(){
        return this.choiceAction();
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
        let result = JSON.parse(await this.getUserData());
        if(result === false){
            console.log('ID 나 password 가 올바르지 않습니다.');
            result = await this.login();
        }
        this.socket.removeAllListeners();
        this.user = result;
        return this.user;
    }

    async signUp(){
        const tempUser = {};
        tempUser.id = this.inputData('Please input your ID> ');
        tempUser.password = this.inputDataHide('Please input your password> ');
        tempUser.password2 = this.inputDataHide('Please input your password again> ');
        if(tempUser.password !== tempUser.password2){
            console.log('비밀번호가 일치하지 않습니다.');
            await this.signUp();
        }
        this.socket.write(`signUp$${tempUser.id}$${tempUser.password}`);
        let result = JSON.parse(await this.getUserData());
        if(result === false){
            console.log('ID 가 이미 존재합니다.');
            result = await this.signUp();
        }
        this.socket.removeAllListeners();
        this.user = result;
        return this.user;
    }
};