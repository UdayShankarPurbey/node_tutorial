//module.exports
//require

const firstModule = require('./first_module');

console.log(firstModule.add(5, 3));

try {
  console.log('Trying to divide by zero');
  let result = firstModule.divide(5, 0);
  console.log('result: ' + result);
} catch (error) {
  console.log('Error: ' + error.message);
}

// module wrapper

// (function (exports, require, module, __filename, __dirname) {
//   // your module code goes here
// }
