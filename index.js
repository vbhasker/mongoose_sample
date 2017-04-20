"use strict";

//import statements
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Books = require('./model/Book');

//contants and declarations
const DB_URL = 'mongodb://ec2-34-208-144-61.us-west-2.compute.amazonaws.com:27017/mydb';
mongoose.Promise = global.Promise;
const port = process.env.PORT_NUMBER||8080;
const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//initializations
mongoose.connect(DB_URL);
let root_route = app.route('/');
let books_route = app.route('/books');

root_route.get(function (req, res) {
    res.send('happy to be here');
});

//list all books on the books route
books_route.get(function (req, res) {
    Books.find({}).
        exec().
            then(function (books_results) {
                res.json(books_results);
    }).catch(function (err) {
        res.send("err");
    })
});

books_route.post(function (req, res){
    let new_book = new Books({
        "title": req.body.title,
        "author": req.body.author,
        "category":req.body.category
    });

    new_book.save()
        .then(function () {
            res.status(201);
            res.send("successfully created.")
        }).catch(function (err) {
            res.send(err);
            res.status(404);
    });
});

let server = http.createServer(app).listen(port, () => {
    console.log('server is listening on port', port);
});