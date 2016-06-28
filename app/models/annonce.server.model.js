/**
 * Created by petersodborgchristensen on 24/04/2016.
 */
var mongoose = require("mongoose")
    Schema = mongoose.Schema;
var annonceSchema = new Schema({
    type: String,
    overskrift: String,
    aktivfra: Date,
    aktivtil: Date,
    thumb: String,
    stortimage: String,
    months: {
        type: String
    },
    lande:[],
    newland: [],
    aktiviteter: [],
    aktivitetsniveauer: [],
    tekster: String,
    godkendt: String,
    status: String,
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Annonce", annonceSchema);
