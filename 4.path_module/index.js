const path = require('path');

console.log('Directory Name : ', path.dirname(__filename));

console.log('Base Name : ', path.basename(__filename));

console.log('File Extension : ', path.extname(__filename));

const joinedPath = path.join('/user', 'document', 'books', 'test.pdf');
console.log('joined Path', joinedPath);

const resolvedPath = path.resolve('/user', 'document', 'books', 'test.pdf');

console.log('Resolved Path', resolvedPath);

const noramalizedPath = path.normalize('/user/.document/../books');

console.log('Normalized Path', noramalizedPath);
