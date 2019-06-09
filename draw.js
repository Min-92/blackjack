var blessed = require('blessed');

module.exports = class Draw {
    constructor() {
        this.screen;
        this.box;
        this.idPrompt;
        this.pwPrompt;
        this.message;
        this.bar;
    }
    removeBar() {
        this.screen.remove(this.bar);
    }

    removePrompt() {
        this.screen.remove(this.idPrompt);
        this.screen.remove(this.pwPrompt);
    }

    setMainMenu() {
        return new Promise(resolve => {
            this.box = blessed.box({
                parent: this.screen,
                top: '20%',
                left: 'center',
                width: '80%',
                height: '50%',
                content: `{center}{red-fg}
  ■ ■ ■   ■          ■      ■ ■ ■  ■   ■    
  ■    ■  ■         ■ ■    ■       ■  ■     
  ■ ■ ■   ■        ■ ■ ■   ■       ■ ■   ■ ■
  ■    ■  ■       ■     ■  ■       ■  ■     
  ■ ■ ■   ■ ■ ■  ■       ■  ■ ■ ■  ■   ■    

 ■ ■ ■     ■      ■ ■ ■  ■   ■ 
    ■     ■ ■    ■       ■  ■  
    ■    ■ ■ ■   ■       ■ ■   
■   ■   ■     ■  ■       ■  ■  
  ■    ■       ■  ■ ■ ■  ■   ■ 

{/red-fg}{/center}
{right}by Wangmin{/right}`,
                tags: true,
                border: {
                    type: 'line'
                },
                style: {
                    fg: 'white',
                    bg: 'black',
                    border: {
                        fg: '#f0f0f0'
                    },
                }
            });

            this.bar = blessed.listbar({
                parent: this.screen,
                top: '70%',
                left: '10%',
                width: '80%',
                height: 'shrink',
                keys: true,
                autoCommandKeys: true,
                border: 'line',
                vi: true,
                style: {
                    bg: 'black',
                    item: {
                        bg: 'black',
                        hover: {
                            bg: 'blue'
                        },
                    },
                    selected: {
                        bg: 'blue'
                    }
                },
                commands: {
                    ' Log in ': () => {
                        resolve('login');

                    },
                    ' Sign up ': () => {
                        resolve('signUp');
                    }
                }
            });

            this.bar.focus();
            this.renderScreen();

        });

    }

    setLogin() {
        return new Promise(resolve => {
            this.idPrompt = blessed.prompt({
                parent: this.screen,
                border: 'line',
                top: '70%',
                left: '10%',
                width: '80%',
                height: 'shrink',
                label: ' {blue-fg}Log in{/blue-fg} ',
                tags: true,
                keys: true,
            });

            this.pwPrompt = blessed.prompt({
                parent: this.screen,
                border: 'line',
                top: '70%',
                left: '10%',
                width: '80%',
                height: 'shrink',
                label: ' {blue-fg}Log in{/blue-fg} ',
                tags: true,
                keys: true,
            });

            this.idPrompt.input('Please input your ID', '', (err, id) => {
                this.pwPrompt.input('Please input your Password', '', (err, password) => {
                    resolve({ id, password });
                });
            });

            this.renderScreen();
        });
    }

    setMessage(message) {
        this.message = blessed.message({
            parent: this.screen,
            border: 'line',
            height: 'shrink',
            width: 'half',
            top: 'center',
            left: 'center',
            label: ` {blue-fg}Message{/blue-fg} `,
            tags: true,
            keys: true,
            hidden: true,
            vi: true
        });
        this.message.display(`${message}`,3,(err) =>{});
    }

    renderScreen() {
        this.screen.render();
    }

    setScreen() {
        this.screen = blessed.screen({
            smartCSR: true,
            autoPadding: true,
            warnings: true
        });
        this.screen.key(['C-c', 'escape'], function () {
            this.screen.destroy();
        });
    }



}



