console.log("Hello Node js from typescript!");

function getName(name: string): string {
  return name;
}

console.log(getName("Uday Kumar Purbey"));

let isDone: boolean = false;

let num: number = 0;

let myString: string = "Hello World!";

let fruitNames: string[] = [
  "Mango",
  "Papaya",
  "Guava",
  "Orange",
  "Grapes",
  "Apple",
];

let rollNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let random: any = 4;
random = "random";
random = false;

let val1: undefined = undefined;

let val2: null = null;

enum color {
  RED,
  GREEN,
  BLUE,
}

let myColor: color = color.RED;

let valueasStringOrNumber: (string | number)[] = ["0", "1", "2", 3, 4, 5];

// interface

interface Person {
  name: string;
  age: number;
  email?: string;
  readonly createdAt: Date;
}

let person: Person = {
  name: "Uday",
  age: 30,
  email: "uday@example.com",
  createdAt: new Date(),
};

//type 
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
};

const product1 : Product = {
  id: 1,
  name: "Laptop",
  price: 10000,
  stock: 100,
}

// function with type annotion

function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Uday"));

// type annotion with arrow function

const add = (a: number, b: number): number => {
  return a + b;
};

console.log(add(5, 10));


//function with optional property 

function getPersonDetails(person: { name: string; age?: number }): string {
  return `Name: ${person.name}, Age: ${person.age || "Unknown"}`;
}

console.log(getPersonDetails({ name: "Uday" }));
