const fs = require('fs');

fs.mkdir('./temp', { recursive: false }, (err) => {
    if(err)console.log(err);
})