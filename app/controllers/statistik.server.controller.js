/**
 * Created by petersodborgchristensen on 27/04/2016.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Statistik = mongoose.model('Statistik'),
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
                message = 'Statistik already exists';
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
 * Create a statistik
 */
exports.create = function(req, res) {
    var stat = new Statistik(req.body);
    stat.user = req.user;

    stat.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(stat);
        }
    });
};


/**
 * Show the current annonce
 */
exports.read = function(req, res) {
    res.jsonp(req.stat);
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
    res.jsonp(req.stat);
};

/**
 * Delete an annonce
 */
exports.delete = function(req, res) {
    var stat = req.stat;

   stat.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(stat);
        }
    });
};

/**
 * List of statistikker
 */
exports.list = function(req, res) {
    Statistik.find().sort('year').populate('user', 'month').exec(function(err, statistikker) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(statistikker);
        }
    });
};

/**
 * Statistik middleware
 */
exports.statistikByID = function(req, res, next, id) {
    Statistik.findById(id).populate('user', 'year').exec(function(err, stat) {
        if (err) return next(err);
        if (!stat) return next(new Error('Failed to load statistik ' + id));
        req.stat = stat;
        next();
    });
};

/**
 * Statistik authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.stat.user.id !== req.user.id) {
        return res.send(403, {
            message: 'User is not authorized'
        });
    }
    next();
};