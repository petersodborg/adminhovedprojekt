/**
 * Created by petersodborgchristensen on 26/04/2016.
 */
var mongoose = require("mongoose")
Schema = mongoose.Schema;

var statAdminSchema = new Schema({
    updateStat: {
        aarstal: Number,
        kvartal: Number
    },
    sendBillingReport: {
        aarstal: Number,
        kvartal: Number,
        sprog: String
    },
    sendAdReport: {
        aarstal: Number,
        month: Number,
        sprog: String
    },
    leadsReport: {
        aarstal: Number,
        month: Number,
        sprog: String
    }
});
module.exports = mongoose.model("StatAdmin", statAdminSchema);