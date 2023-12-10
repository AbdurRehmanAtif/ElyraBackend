async function greet() {
    return Promise.reject("hellow")
}
async function greet2() {
    return Promise.resolve("Rejected greet2")
}
async function greet3() {
    return Promise.resolve("hellow asdasdad")
}
async function greet4() {
    return Promise.reject("Rejected greet4")
}

async function myAsyncFunction() {
    try {
        const first = await greet();
        const result2 = await greet2();
        const result3 = await greet3();
        const result4 = await greet4();
        console.log(first);
        console.log(result2);
        console.log(result3);
        console.log(result4);

    } catch (error) {
        console.error(error);
    }
}
myAsyncFunction();