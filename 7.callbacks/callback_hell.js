const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const outputFilePath = path.join(__dirname, 'output.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error Reading File : ', err);
    return;
  }

  const modifyData = data.toUpperCase();
  fs.writeFile(outputFilePath, modifyData, (err) => {
    if (err) {
      console.error('Error Writing File ', err);
      return;
    }

    console.log('File has been converted to uppercase and saved successfully.');
    fs.readFile(outputFilePath, 'utf8', (err, modifiedData) => {
      if (err) {
        console.error('Error Reading Modified File : ', err);
        return;
      }
      console.log('Modified File Contents : ', modifiedData);
    });
  });
});
