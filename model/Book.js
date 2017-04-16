'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new Schema({
    title: String,
    author: String,
    category: String
    // published: {
    //     type: Date,
    //     default: Date.now()
    // },
    // keywords: Array,
    // is_published: Boolean,
    // //foreign reference to author object
    // author: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User'
    // },
    // //embedded sub-document
    // details: {
    //     model_number: Number,
    //     is_hardcover: Boolean,
    //     reviews: Number,
    //     rank: Number
    // }
});

var Books = mongoose.model('Books', BookSchema);
module.exports = Books;
