const str = `require('./moduleA');const str = require('./moduleB');console.log(str);`;

const functionWrapper = [
  'function(require, module, exports) {',
  '}'
];

const result = functionWrapper[0] + str + functionWrapper[1];
console.log(result);
