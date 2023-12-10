class Person {

    constructor(fName, lName) {
        this.fName = fName;
        this.lName = lName;
    }

    sayMyName() {
        console.log(`this is your full name ${this.fName} ${this.lName}`)
    }
}
// const p1 = new Person("Ali", "Atif")
// p1.sayMyName();


class SuperHero extends Person {
    constructor(fName, lName) {
        super(fName, lName)
        this.isSuperHerp = true;
    }
    fightcrime() {
        return "Fight Crime"
    }
}

const sp1 = new SuperHero("Ali", "Super")
console.log(sp1.fightcrime())