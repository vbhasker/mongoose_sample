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
        res.sendStatus(200);
    })
});

router.delete('/:id?', function (req, res) {
    Books.remove({
        _id: req.params.id
    }).exec().then(function (count) {
        if (count.result.n === 0){
            res.json({message: 'No items found to delete.'});
        } else {
            res.json({message: 'Items deleted: ' + count.result.n});
        }
    }).catch(function (err) {
        res.send(err);
    });
});

router.put('/:id?', function (req, res) {
    Books.findOneAndUpdate({
        _id: req.params.id
    }, { $set:{title: req.body.title}
    }, {upsert:true}
    , function (err, doc) {
            if (err){
                res.send(err);
            }
            res.sendStatus(204);
        }
    );
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
            res.json(new_book);
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
        res.send(err);
    })
});

module.exports = router;