const blessed = require('blessed');

module.exports = class Draw {
    constructor() {
        this.screen;
        this.box;
        this.prompt;
        this.bar;
        this.deck;
        this.moneyObject;
        this.messageObject;
        this.chipColor = {
            '1': 'yellow',
            '5': 'green',
            '25': 'blue',
            '100': 'red',
            '500': 'black'
        }
        this.suitColor = {
            '◆': 'red',
            '♣': 'black',
            '♠': 'black',
            '♥': 'red'
        }
        this.bettingMoney = 0;
        this.chip = [];
        this.playerSum;
        this.dealerSum;
        this.dealerHand = [];
        this.playerHand = [];
    }

    removeBar() {
        this.bar.destroy();
    }
    removeBox() {
        this.box.destroy();
    }

    removePrompt() {
        this.prompt.destroy();

    }

    blackjackTable(money) {
        this.box = blessed.box({
            parent: this.screen,
            top: 0,
            left: 'center',
            width: '90%',
            height: '80%',
            content: ``,
            tags: true,
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                bg: '#055F40',
                border: {
                    fg: '#f0f0f0'
                },
            }
        });

        this.center = blessed.box({
            parent: this.box,
            top: 'center',
            left: 'center',
            width: 'shrink',
            height: 'shrink',
            content: '{center}{bold}           BLACK JACK           {/bold}{/center}',
            tags: true,
            border: {
                type: 'line',
                bg: '#055F40',
                fg: 'yellow',
            },
            style: {
                fg: 'yellow',
                bg: '#055F40',
            }
        });

        this.deck = blessed.box({
            parent: this.box,
            top: 0,
            left: '85%',
            width: 'shrink+9',
            height: 'shrink',
            content: `※※※※※※\n※※※※※※\n※※※※※※\n※※※※※※\n※※※※※※`,
            tags: true,
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                bg: '#861515',
                border: {
                    fg: '#f0f0f0'
                },
            }
        });
        this.money(money);
        this.renderScreen();
        this.message(`\n     {bold}Start game!{/bold}     \n`, 1);
    }

    mainMenu() {
        return new Promise(resolve => {
            this.box = blessed.box({
                parent: this.screen,
                top: '5%',
                left: 'center',
                width: '80%',
                height: '50%',
                content: `{center}{yellow-fg}
■ ■ ■   ■          ■      ■ ■ ■  ■   ■ 
■    ■  ■         ■ ■    ■       ■  ■  
■ ■ ■   ■        ■ ■ ■   ■       ■ ■   
■    ■  ■       ■     ■  ■       ■  ■  
■ ■ ■   ■ ■ ■  ■       ■  ■ ■ ■  ■   ■ 

 ■ ■ ■     ■      ■ ■ ■  ■   ■ 
    ■     ■ ■    ■       ■  ■  
    ■    ■ ■ ■   ■       ■ ■   
■   ■   ■     ■  ■       ■  ■  
  ■    ■       ■  ■ ■ ■  ■   ■ 

{/yellow-fg}{/center}
{right}by Wangmin{/right}`,
                tags: true,
                border: {
                    type: 'line'
                },
                style: {
                    fg: 'white',
                    bg: '#055F40',
                    border: {
                        fg: '#f0f0f0'
                    },
                }
            });

            this.bar = blessed.listbar({
                parent: this.screen,
                top: '55%',
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

    setMainPrompt(content) {
        this.prompt = blessed.prompt({
            parent: this.screen,
            border: 'line',
            top: '55%',
            left: '10%',
            width: '80%',
            height: 'shrink',
            label: ` {blue-fg}${content}{/blue-fg} `,
            tags: true,
            keys: true,
        });
    }

    login() {
        return new Promise(resolve => {
            this.setMainPrompt('Log in');
            this.prompt.input('Please input your ID', '', (err, id) => {
                this.prompt.input('Please input your Password', '', (err, password) => {
                    resolve({ id, password });
                });
            });
            this.renderScreen();
        });
    }
    
    signUp() {
        return new Promise(resolve => {
            this.setMainPrompt('Sign up');
            this.prompt.input('Please input your ID', '', (err, id) => {
                this.prompt.input('Please input your Password', '', (err, password) => {
                    this.prompt.input('Please input again your Password', '', (err, password2) => {
                        resolve({ id, password, password2 });
                    });
                });
            });
            this.renderScreen();
        });
    }

    message(message, time) {
        this.setMessage();
        this.messageObject.display(`${message}`, time, (err) => { });
    }

    setMessage() {
        this.messageObject = blessed.message({
            parent: this.screen,
            border: 'line',
            height: 'shrink',
            width: 'shrink',
            top: 'center',
            left: 'center',
            label: ` {blue-fg}Message{/blue-fg} `,
            tags: true,
            keys: true,
            hidden: true,
            vi: true
        });
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