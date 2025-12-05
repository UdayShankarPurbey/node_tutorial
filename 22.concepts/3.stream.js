//readable  --> use for read
// writable --> use for write
// duplex --> use for both read and write (TCP Socket)
// transform --> zlib streams

const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const { Transform } = require('stream');

class EncryptString extends Transform {
  constructor(key, vector) {
    super();
    this.key = key;
    this.vector = vector;
  }

  _transform(chunk, encoding, callbackFn) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
    const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]);
    this.push(encrypted);
    callbackFn();
  }
}

const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);

const readableStream = fs.createReadStream('./3.input.txt');

// create new gzip object

const gzipStream = zlib.createGzip();

const encryptSteam = new EncryptString(key, vector);

const writableStream = fs.createWriteStream('./3.output.txt.gz.enc');

// read --> compress --> encrypt --> write

readableStream.pipe(gzipStream).pipe(encryptSteam).pipe(writableStream);

console.log('Streaming --> Encrypting --> Writting Data');
