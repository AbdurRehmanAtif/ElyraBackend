const promise1 = new Promise((resolve, reject) => {

    setInterval(() => {
        resolve()
    }, 3000)

    setInterval(() => {
        reject()
    }, 2000)
})

const onFulFillment = (result) => {
    console.log(result)
    console.log("fulfillment function worked")
}
const onRejection = (error) => {
    console.log(error)
    console.log("onRejection function worked")
}

promise1.then(onFulFillment)
    .catch(onRejection)


//............................


async function greet() {
    return Promise.reject("Errr")
}
greet()
    .then((value) => {
        console.log(value)
    })
    .catch((err) => {
        console.log(err)
    })