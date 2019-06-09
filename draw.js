var blessed = require('blessed');

module.exports = class Draw {
    constructor() {
        this.screen;
        this.box;
        this.prompt;
        this.bar;
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

                                      by Wangmin{/red-fg}{/center}`,
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
                    ' Log in ':
                        () => {
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



