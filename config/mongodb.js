const mongoose = require('mongoose');
require('dotenv').config();

function connectMongo(app, URL) {

    mongoose.connect(URL).then(() => {
        console.log("App is connected to MONGO DB")
    }).catch((error) => {
        console.log(error)
    })
}


module.exports = {
    connectMongo
};