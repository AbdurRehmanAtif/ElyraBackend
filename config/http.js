const express = require('express');
require('dotenv').config();
const cors = require('cors'); // Import the CORS middleware


function expressInit() {
    // create express connection
    const app = express();
    // let the api use json requests
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    return app;
}


function expressStart(app, PORT) {
    // start the app on specific PORT
    app.listen(PORT, () => {
        console.log(`App is listening to ${process.env.PORT}`);
    })

}

module.exports = {
    expressInit,
    expressStart
};



