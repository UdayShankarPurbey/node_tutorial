const EventEmitter = require('events');

const myFirstEmitter = new EventEmitter();

myFirstEmitter.on('greet', (name) => {
    console.log(`Hello! ${name} This Side `)
})

myFirstEmitter.emit('greet' , 'Uday Kumar Purbey')