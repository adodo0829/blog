const a = require('./a.js');
const b = require('./a.js');

if (a !== b) {
    throw new Error();
}

console.log('case3');
