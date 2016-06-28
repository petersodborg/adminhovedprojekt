/**
 * Created by petersodborgchristensen on 26/04/2016.
 */
var mongoose = require("mongoose")
Schema = mongoose.Schema;

var landSchema = new Schema({
    _creator : { type: Number, ref: 'Annonce' },
  landeNavn : { type: String, ref: 'Annonce' },
  Region: { type: String, ref: 'Annonce' },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model("Land", landSchema);
