/**
 * Created by petersodborgchristensen on 26/04/2016.
 */
var mongoose = require("mongoose")
Schema = mongoose.Schema;

var statistikSchema = new Schema({
    year: Number,
    month: Number,
    visninger: Number,
    klik_tilbud: Number,
    klik_microsite: Number,
    klik_hjemmeside: Number,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model("Statistik", statistikSchema);