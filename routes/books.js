"use strict";

let express = require('express');
let Books = require('../model/Book');
let router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    console.log('incoming request', req.originalUrl);
    next();
});

// define the home page route
router.get('/', function (req, res) {
    Books.find({}).
    exec().
    then(function (books_results) {
        res.json(books_results);
    }).catch(function (err) {
        res.send("err");
    })
});

router.post('/', function (req, res) {
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

router.get('/:id', function (req, res) {
    Books.findOne({
        _id: req.params.id
    }).exec()
        .then(function(book) {
            res.json(book);
    }).catch(function (err) {
        res.status(404);
        res.send(err);
    })
});

module.exports = router;
