function greet(name) {
    console.log(`Hellow ${name}`)
}


function greetMe(greet) {
    const name = "Ali";
    greet(name)
}

console.log(greetMe(greet))