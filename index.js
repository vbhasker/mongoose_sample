"use strict";

const express = require('express');
const http = require('http');
const books = require('./routes/books')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//contants and declarations
const DB_URL = 'mongodb://ec2-34-208-144-61.us-west-2.compute.amazonaws.com:27017/mydb';
const port = process.env.PORT_NUMBER||8080;
const app = express();
mongoose.connect(DB_URL);
mongoose.Promise = global.Promise;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//root page function
app.get('/', function (req, res) {
    res.send('happy to be here');
});

//routes for other pages - modular design
app.use('/books', books);

let server = http.createServer(app).listen(port, () => {
    console.log('server is listening on port', port);
});