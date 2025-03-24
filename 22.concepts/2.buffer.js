//object to hadle binary data

const buffOne = Buffer.alloc(10);

console.log("buffer one : ", buffOne);

const bufferFromString = Buffer.from('Uday Kumar Purbey.');

console.log("buffer from string : ", bufferFromString);


const bufferFromArray = Buffer.from([75, 117, 100, 97, 32, 75, 117, 109, 112, 114, 101, 121, 46]);

console.log("buffer from array : ", bufferFromArray);

buffOne.write('Uday Kumar Purbey');
console.log("buffer one after writing : ", buffOne.toString());

const concatBuffer = Buffer.concat([buffOne, bufferFromString]);

console.log("concatenated buffer : ", concatBuffer);

console.log("Buffer to Json " + concatBuffer.toJSON());