/**
 * Created by petersodborgchristensen on 05/04/16.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Operatør schemaa
 */
var OperatorSchema = new Schema({
    operatorNavn: {
        type: String
    },
    aktiv: {
        type: String
    },
    innaktiv: {
        type: String
    },
    operaKat: {
        type: String
    },
    addresse: {
        type: String
    },
    postnr: {
        type: Number
    },
    city: {
        type: String
    },
    PO: {
        type: String
    },
    telefon: {
        type: Number
    },
    email: {
        type: String
    },
    web: {
        type: String
    },
    faktureringsKat:{
        type: String
    },
    pakke:{
        type: String
    },
    pakkeExpiry:{
        type: Date
    },
    budgetMax: {
        type: Number
    },
    priotet:{
        type: Number
    },
    microSiteID: {
        type: Number
    },
    beskrivelse: {
        type: String
    },
    engelskBeskrivelse:{
        type: String
    },
    logo: {
        type: String
    },
    andetBillede:{
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    land: {
        type: Schema.ObjectId,
        ref: 'Land'
    }

});

mongoose.model('Operator', OperatorSchema);