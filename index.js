"use strict";

//import statements
const express = require('express');
const http = require('http');
const parser = require('body-parser');
const mongoose = require('mongoose');
const Books = require('./model/Book');

//contants and declarations
const DB_URL = 'mongodb://ec2-34-208-144-61.us-west-2.compute.amazonaws.com:27017/mydb';
const port = process.env.PORT_NUMBER||8080;
const app = express();

//initializations
mongoose.connect(DB_URL);
let books = new Books();
let root_route = app.route('/');
let books_route = app.route('/books');

// let intersting_book = new Book({
//     title: "Another book in the woods!!",
//     author: "Vinodh",
//     category: "Comic"
// });
//
// intersting_book.save()
//     .then(function (doc) {
//     console.log('Book saved successfully!')
// });

root_route.get(function (req, res, next) {
    res.send('happy to be here');
});

//list all books on the books route
books_route.get(function (req, res) {
    Books.find({}).
    exec(function (err, books_results) {
        if (err) {
            console.log("error retrieving the books");
            res.send("error retrieving the books");
        } else {
            res.json(books_results);
        }
    });
});


let server = http.createServer(app).listen(port, () => {
    console.log('server is listening on port', port);
});



