/**
 * Created by petersodborgchristensen on 27/04/2016.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Pris = mongoose.model('Pris'),
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
                message = 'Pris eller kategori eksisterer allerede';
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
 * Create a pris
 */
exports.create = function(req, res) {
    var pris = new Pris(req.body);
    pris.user = req.user;

    pris.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(pris);
        }
    });
};


/**
 * Show the current annonce
 */
exports.read = function(req, res) {
    res.jsonp(req.pris);
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
    res.jsonp(req.pris);
};

/**
 * Delete an annonce
 */
exports.delete = function(req, res) {
    var pris = req.pris;

    pris.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(pris);
        }
    });
};
/**
 * Update a pris
 */
exports.update = function(req, res) {
    var pris = req.priser;

    priser = _.extend(priser, req.body);

    priser.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(priser);
        }
    });
};

/**
 * List of statistikker
 */
exports.list = function(req, res) {
    Pris.find().sort('kategori').populate('user', 'budget').exec(function(err, priser) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(priser);
        }
    });
};
/**
 * pris middleware
 */
exports.prisByID = function(req, res, next, id) {
    Pris.findById(id).populate('user', 'displayName').exec(function(err, pris) {
        if (err) return next(err);
        if (!pris) return next(new Error('Failed to load statistik ' + id));
        req.pris = pris;
        next();
    });
};

/**
 * Statistik authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.pris.user.id !== req.user.id) {
        return res.send(403, {
            message: 'User is not authorized'
        });
    }
    next();
};
