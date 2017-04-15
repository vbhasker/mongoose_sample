/**
 * Created by vinodh on 4/15/17.
 */
'use strict';

import mongoose from 'mongoose';

var bookSchema = new mongoose.Schema({
    title: String,
    published: {
        type: Date,
        default: Date.now()
    },
    keywords: Array,
    is_published: Boolean,
    //foreign reference to author object
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    //embedded sub-document
    details: {
        model_number: Number,
        is_hardcover: Boolean,
        reviews: Number,
        rank: Number
    }
});

modules.exports = mongoose.model('Books', bookSchema);
