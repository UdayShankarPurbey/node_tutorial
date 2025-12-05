/* 
micro task :process.nextTick , promises 

macro task : setTimeout , setInterval 
 */

// timers  --> pending callbacks  -->  idle , prepare  -->  poll  --> check  --> close callbacks

const fs = require('fs');
const crypto = require('crypto');

console.log('1. Script Started');

setTimeout(() => {
  console.log('2. setTimeout 0 sec Callback (macrotask)');
}, 0);

setTimeout(() => {
  console.log('3. setTimeout 0 sec Callback (macrotask)');
}, 0);

setImmediate(() => {
  console.log('4. setImmediate Callback (check)');
});

Promise.resolve().then(() => {
  console.log('5. Promise resolved (microtask)');
});

process.nextTick(() => {
  console.log('6. process.nextTick Callback (microtask)');
});

fs.readFile(__filename, () => {
  console.log('7. File read Operation (I/O callback)');
});

crypto.pbkdf2('secrest', 'salt', 10000, 64, 'sha512', (err, key) => {
  if (err) throw err;
  console.log('8. pbkdf2 Operation (CPU Intensive task)');
});

console.log('9. Scripts Ends...');
