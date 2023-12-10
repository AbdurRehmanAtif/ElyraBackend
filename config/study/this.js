
// There are four types of binding in java script
// Implicit Binding
// Explicit Binding
// New Binding
// default Binding

// Implicite Binding of variable name with "This"

const person = {
    name: "rehman",
    sayMyName: function () {
        console.log(`My Name is ${this.name}`)
    }
}
const greet = {
    name: "Usama Ali"
}
//Function of another object can be implicity bind to another object
greet.sayMyName = person.sayMyName;
// My Name is ali
// greet.sayMyName(); -- Results

//--------------------------------------------------------------

// Explicit Binding

function hello() {
    console.log(`This is hello from ${this.name}`)
}

// Built in methos name "Call"
hello.call(greet)


//--------------------------------------------------------------
//New binding

function ObjectPerson(name) {
    this.name = name;
}
const p1 = new ObjectPerson("ali")
const p2 = new ObjectPerson("aatif")

// console.log(p1, p2)
// console.log(person)
// console.log(greet)

// sayMyName() -- undefined

//--------------------------------------------------------------

// Global Scope
function sayHello() {
    console.log(`Hello, my name is ${this.name}`);
}

// Example 1: Default binding in a browser environment
const globalObject = {
    name: 'Global',
};

// Invoke the function in the global context
sayHello(); // Outputs: "Hello, my name is undefined" or "Hello, my name is [globalObjectName]" in browsers

// Example 2: Default binding in a Node.js environment
global.name = 'Global';

// Invoke the function in the global context
sayHello(); // Outputs: "Hello, my name is Global"



// Order of Precedence
// New Binding
// Explicit Binding
// Implicit Binding
// Default Binding