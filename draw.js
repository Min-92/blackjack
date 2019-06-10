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

    gameOver() {
        this.screen.destroy();
        this.setScreen();
        this.message('\n     {bold}GAME OVER{/bold}     \n', -1);
        return false;
    }
    removeChips() {
        for (let i = 0; i < this.chip.length; i++) {
            this.chip[i].destroy();
        }
        this.chip = [];
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

    setListBar(setCommands) {
        return new Promise(resolve => {
            const commands = setCommands(resolve);
            this.bar = blessed.listbar({
                parent: this.screen,
                top: '80%',
                left: 'center',
                width: '90%',
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
                commands
            });
            this.bar.focus();
            this.renderScreen();
        });
    }

    async topUpMoney() {
        this.message('You are broke...\nI will recharge your money.\nBut you need to buy coffee to Wangmin.\nDo you agree?', -1);
        const setCommands = (callback) => {
            return {
                ' Yes ': () => {
                    return callback(1000);
                },
                ' No (Game over) ': () => {
                    return callback(this.gameOver()
                    );
                }
            };
        };
        return await this.setListBar(setCommands);
    }

    async choiceRestart() {
        const setCommands = (callback) => {
            return {
                ' Restart ': () => {
                    return callback(true);
                },
                ' Exit ': () => {
                    return callback(false);
                }
            };
        };
        return await this.setListBar(setCommands);
    }

    async choiceAction() {
        const setCommands = (callback) => {
            return {
                ' Hit ': () => {
                    callback('hit');
                },
                ' Stay ': () => {
                    callback('stay');
                }
            };
        };
        return await this.setListBar(setCommands);
    }

    setDealerSum(sum) {
        if (this.dealerSum) {
            this.dealerSum.destroy();
        }
        this.dealerSum = blessed.box({
            parent: this.box,
            top: '25%',
            left: '10%',
            width: 'shrink',
            height: 'shrink',
            content: `{center}{bold}sum : ${sum}{/bold}{/center}`,
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
        this.renderScreen();
    }
    
    setPlayerSum(sum) {
        if (this.playerSum) {
            this.playerSum.destroy();
        }
        this.playerSum = blessed.box({
            parent: this.box,
            top: '50%',
            left: '10%',
            width: 'shrink',
            height: 'shrink',
            content: `{center}{bold}sum : ${sum}{/bold}{/center}`,
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
        this.renderScreen();
    }

    printDealerHands(hand) {
        if (this.dealerHand.length) {
            this.dealerHand = this.claerHand(this.dealerHand);
        }
        let space;
        let color;
        for (let i = 0; i < hand.length; i++) {
            space = this.dealerHand.length * 5;
            color = this.suitColor[hand[i].suit];
            this.dealerHand.push(blessed.box({
                parent: this.box,
                top: '0',
                left: `30%+${space}`,
                width: 'shrink+9',
                height: 'shrink',
                content: `${hand[i].number}     \n${hand[i].suit}     \n      \n     ${hand[i].suit}\n     ${hand[i].number}`,
                tags: true,
                border: {
                    type: 'line'
                },
                style: {
                    fg: `${color}`,
                    bg: 'white',
                    border: {
                        fg: '#f0f0f0'
                    },
                }
            }));
        }
        this.renderScreen();
    }

    printDealerHandsHide(hand) {
        if (this.dealerHand.length) {
            this.dealerHand = this.claerHand(this.dealerHand);
        }
        let space;
        let color;
        space = this.dealerHand.length * 5;
        this.dealerHand.push(blessed.box({
            parent: this.box,
            top: '0',
            left: `30%+${space}`,
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
        }));

        space = this.dealerHand.length * 5;
        color = this.suitColor[hand.suit];
        this.dealerHand.push(blessed.box({
            parent: this.box,
            top: '0',
            left: `30%+${space}`,
            width: 'shrink+9',
            height: 'shrink',
            content: `${hand.number}     \n${hand.suit}     \n      \n     ${hand.suit}\n     ${hand.number}`,
            tags: true,
            border: {
                type: 'line'
            },
            style: {
                fg: `${color}`,
                bg: 'white',
                border: {
                    fg: '#f0f0f0'
                },
            }
        }));
        this.renderScreen();
    }

    claerHand(hand) {
        for (let value of hand) {
            value.destroy();
        }
        return [];
    }

    printHands(hand) {
        if (this.playerHand.length) {
            this.playerHand = this.claerHand(this.playerHand);
        }
        let space;
        let color;
        for (let i = 0; i < hand.length; i++) {
            space = this.playerHand.length * 5;
            color = this.suitColor[hand[i].suit];
            this.playerHand.push(blessed.box({
                parent: this.box,
                top: '60%',
                left: `10%+${space}`,
                width: 'shrink+9',
                height: 'shrink',
                content: `${hand[i].number}     \n${hand[i].suit}     \n      \n     ${hand[i].suit}\n     ${hand[i].number}`,
                tags: true,
                border: {
                    type: 'line'
                },
                style: {
                    fg: `${color}`,
                    bg: 'white',
                    border: {
                        fg: '#f0f0f0'
                    },
                }
            }));
        }
        this.renderScreen();
    }

    setChip(amount, space, color) {
        return blessed.box({
            parent: this.box,
            bottom: 0,
            left: `5%+${space}`,
            width: 'shrink',
            height: 'shrink',
            content: `{bold}${amount}{/bold}`,
            tags: true,
            border: {
                type: 'line',
                bg: '#055F40'
            },
            style: {
                fg: 'white',
                bg: `${color}`,
            }
        })
    }

    betting(amount, money) {
        if (amount > money) {
            this.message(`Can't bet anymore!`,1);
            return money;
        }
        money -= amount;
        this.bettingMoney += amount;
        const color = this.chipColor[amount];
        const space = this.chip.length * 5;
        this.chip.push(this.setChip(amount, space, color));
        return money;
    }

    async bettingBar(money) {
        this.bettingMoney = 0;
        const setCommands = (callback) => {
            return {
                ' 1 ': () => {
                    money = this.betting(1, money);
                },
                ' 5 ': () => {
                    money = this.betting(5, money);
                },
                ' 25 ': () => {
                    money = this.betting(25, money);
                },
                ' 100 ': () => {
                    money = this.betting(100, money);
                },
                ' 500 ': () => {
                    money = this.betting(500, money);
                },
                ' Bet! ': () => {
                    callback(this.bettingMoney);
                }
            };
        };
        return await this.setListBar(setCommands);
    }

    money(money) {
        if (this.moneyObject) {
            this.moneyObject.destroy();
        }
        this.moneyObject = blessed.box({
            parent: this.box,
            top: 0,
            left: '0',
            width: 'shrink',
            height: 'shrink',
            content: `{center}{bold}Your Money : ${money}{/bold}{/center}`,
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
        this.renderScreen();
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