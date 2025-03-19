const fs = require('fs');
const path = require('path');
function person (name , callbackFn) {
  console.log('Person Name:', name);
  callbackFn();  // execute the callback function
}


function address() {
  console.log("Current Address:");
}


person('John Doe', address);

const filePath = path.join(__dirname, 'input.txt');
fs.readFile(filePath , 'utf-8' , (err , data) => {
  if (err) throw err;
  console.log('File Content:', data);
})