/**
 * Created by petersodborgchristensen on 25/04/2016.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Annonce = mongoose.model('Annonce'),
    Land = mongoose.model('Land'),
    Aktivitet = mongoose.model('Aktivitet'),
    Operator = mongoose.model('Operator'),
    _ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Annonce already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

/**
 * Create a annonce
 */
exports.create = function(req, res) {
    var annonce = new Annonce(req.body);
    annonce.user = req.user;

    annonce.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(annonce);
        }
    });
};
/**
 * Update a annonce
 */
exports.update = function(req, res) {
    var annonce = req.annonce;

    annonce = _.extend(annonce, req.body);

    annonce.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(annonce);
        }
    });
};

/**
 * Show the current annonce
 */
exports.read = function(req, res) {
    res.jsonp(req.annonce);
};

/**
 * Delete an annonce
 */
exports.delete = function(req, res) {
    var annonce = req.annonce;

    annonce.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(annonce);
        }
    });
};

/**
 * List of Annoncer
 */
exports.list = function(req, res) {
    Annonce.find().sort('-created').populate('user', 'displayName').exec(function(err, annoncer) {
        Land.find().sort('-created').populate('user', 'displayName').exec(function(err, lande){
        Aktivitet.find().sort('-created').populate('user', 'displayName').exec(function(err, aktiviteter){
            Operator.find().sort('-created').populate('user', 'displayName').exec(function(err, operators){

        //var all = annoncer.concat(lande,aktiviteter);
        res.jsonp(annoncer);
                    });

        });
    });
});
};
/**
 * Paginate List annoncer
 **/
exports.annoncerList = function(req, res){

    if(!req.params.page)
    {
        var page = 1;
    }else{
        var page = req.params.page;
    }
    var per_page =10;

    Annonce.find().sort('-created').skip((page-1)*per_page).limit(per_page).populate('user', 'type').exec(function(err, annoncer) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(annoncer);
        }
    });

};
/**
 * Annonce middleware
 */
exports.annonceByID = function(req, res, next, id) {
    Annonce.findById(id).populate('user', 'displayName').exec(function(err, annonce) {
        if (err) return next(err);
        if (!annonce) return next(new Error('Failed to load annonce ' + id));
        req.annonce = annonce;
        next();
    });
};

/**
 * Annonce authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.annonce.user.id !== req.user.id) {
        return res.send(403, {
            message: 'User is not authorized'
        });
    }
    next();
};
