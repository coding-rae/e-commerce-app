const express = require('express');
const app = express()

const loaders = require('./loaders');

const {PORT} = require('./config');

async function startServer() {

    //Init app loaders
    loaders(app);

    //Start server
    app.listen(PORT, () => {
        console.log('Server is listening on port ${PORT');
    })
}

startServer();

