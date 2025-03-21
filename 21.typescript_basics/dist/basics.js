"use strict";
console.log("Hello Node js from typescript!");
function getName(name) {
    return name;
}
console.log(getName("Uday Kumar Purbey"));
let isDone = false;
let num = 0;
let myString = "Hello World!";
let fruitNames = [
    "Mango",
    "Papaya",
    "Guava",
    "Orange",
    "Grapes",
    "Apple",
];
let rollNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let random = 4;
random = "random";
random = false;
let val1 = undefined;
let val2 = null;
var color;
(function (color) {
    color[color["RED"] = 0] = "RED";
    color[color["GREEN"] = 1] = "GREEN";
    color[color["BLUE"] = 2] = "BLUE";
})(color || (color = {}));
let myColor = color.RED;
let valueasStringOrNumber = ["0", "1", "2", 3, 4, 5];
let person = {
    name: "Uday",
    age: 30,
    email: "uday@example.com",
    createdAt: new Date(),
};
const product1 = {
    id: 1,
    name: "Laptop",
    price: 10000,
    stock: 100,
};
// function with type annotion
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Uday"));
// type annotion with arrow function
const add = (a, b) => {
    return a + b;
};
console.log(add(5, 10));
//function with optional property 
function getPersonDetails(person) {
    return `Name: ${person.name}, Age: ${person.age || "Unknown"}`;
}
console.log(getPersonDetails({ name: "Uday" }));
