// Creats interator in a way simple way

function normalFunction() { }
function* generatorFunction() {
    yield 'Hello'
    yield 'World'
}

const genObject = generatorFunction()

for (const word of genObject) {
    console.log(word)
}