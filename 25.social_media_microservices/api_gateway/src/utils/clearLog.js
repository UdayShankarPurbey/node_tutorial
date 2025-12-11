const fs = require('fs');
const path = require('path');

function clearLogFiles() {
  const logFiles = ['error.log', 'combined.log'];
  logFiles.forEach((file) => {
    const filePath = path.join(__dirname, '..', '..', file); // Adjust path if needed
    try {
      fs.unlinkSync(filePath); // Truncates the file
    } catch (err) {
      console.error(`Failed to clear log file ${file}:`, err);
    }
  });
}

module.exports = { clearLogFiles };
