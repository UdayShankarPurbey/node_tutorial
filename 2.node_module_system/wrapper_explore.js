console.log('Node module wrapper explorer');

console.log('_filename', __filename);
console.log('_dirname', __dirname);

module.exports.greet = function (name) {
  console.log('Hello ' + name);
};
