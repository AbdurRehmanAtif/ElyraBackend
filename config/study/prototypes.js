function Person(fName, lName) {
    this.fName = fName;
    this.lName = lName;
}


const person1 = new Person('Ali', 'one')
const person2 = new Person('Ali', 'two')

person1.getFullName = function () {
    console.log(`this is your full name ${this.fName} ${this.lName}`)
}
// its only wprk because its attached to person 1 ONLY
// console.log(person1.getFullName())

// now lets prototype functions

Person.prototype.getFullName = function () {
    console.log(`this is your full name ${this.fName} ${this.lName}`)
}

// person2.getFullName()


// Base Vehicle constructor
function Vehicle(make, model) {
    this.make = make;
    this.model = model;
}

// Adding methods to the Vehicle prototype
Vehicle.prototype.start = function () {
    console.log(`The ${this.make} ${this.model} is starting.`);
};

Vehicle.prototype.stop = function () {
    console.log(`The ${this.make} ${this.model} is stopping.`);
};

// Car constructor that inherits from Vehicle
function Car(make, model, numDoors) {
    // Call the parent constructor
    Vehicle.call(this, make, model);

    // Additional property specific to Car
    this.numDoors = numDoors;
}

// Set up prototype chain for inheritance
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// Adding a method specific to Car
Car.prototype.honk = function () {
    console.log(`The ${this.make} ${this.model} goes honk honk!`);
};

// Motorcycle constructor that inherits from Vehicle
function Motorcycle(make, model, numWheels) {
    // Call the parent constructor
    Vehicle.call(this, make, model);

    // Additional property specific to Motorcycle
    this.numWheels = numWheels;
}

// Set up prototype chain for inheritance
Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;

// Adding a method specific to Motorcycle
Motorcycle.prototype.rev = function () {
    console.log(`The ${this.make} ${this.model} is revving the engine.`);
};

// Create instances
const car = new Car('Toyota', 'Camry', 4);
const bike = new Motorcycle('Honda', 'CBR', 2);

// Accessing properties and methods
car.start();      // Outputs: "The Toyota Camry is starting."
car.honk();       // Outputs: "The Toyota Camry goes honk honk!"

bike.start();     // Outputs: "The Honda CBR is starting."
bike.rev();       // Outputs: "The Honda CBR is revving the engine."
