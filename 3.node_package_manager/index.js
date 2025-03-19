const lodash = require('lodash');

const names = [ 'Uday Kumar Purbey' , 'raj' , 'mohan' , 'marshal' , ]

const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalize);