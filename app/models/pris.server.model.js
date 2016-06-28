/**
 * Created by petersodborgchristensen on 27/04/2016.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Pris schemaa
 */
var prisSchema = new Schema({
    kategori: {
        type: String
    },
    pakke: {
        type: String
    },
    pristilbud: {
        type: Number
    },
    prismicrosite: {
        type: Number
    },
    prisklikhjemmeside: {
        type: Number
    },
    budget: {
        type: Number
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Pris', prisSchema);