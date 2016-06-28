/**
 * Created by petersodborgchristensen on 26/04/2016.
 */
var mongoose = require("mongoose")
Schema = mongoose.Schema;

var aktivitetSchema = new Schema({
    Title: String,
    TagCategoryID: String,
    aktivitetsniveau:[],
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model("Aktivitet", aktivitetSchema);
