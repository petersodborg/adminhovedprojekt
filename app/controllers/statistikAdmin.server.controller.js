/**
 * Created by petersodborgchristensen on 09/05/2016.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    StatAdmin = mongoose.model('StatAdmin'),
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
                message = 'StatAdmin already exists';
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
    var statadmin = new StatAdmin(req.body);
    statadmin.user = req.user;

    statadmin.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(statadmin);
        }
    });
};


/**
 * Show the current annonce
 */
exports.read = function(req, res) {
    res.jsonp(req.statadmin);
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
    res.jsonp(req.statadmin);
};

/**
 * Delete an annonce
 */
exports.delete = function(req, res) {
    var statadmin = req.statadmin;

    statadmin.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(statadmin);
        }
    });
};

/**
 * List of statistikker
 */
exports.list = function(req, res) {
    StatAdmin.find().sort('updateStat').populate('user', 'updateStat').exec(function(err, statistikeradmin) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(statistikkeradmin);
        }
    });
};

/**
 * Statistik middleware
 */
exports.statistikAdminByID = function(req, res, next, id) {
    StatAdmin.findById(id).populate('user', 'updateStat').exec(function(err, stat) {
        if (err) return next(err);
        if (!stat) return next(new Error('Failed to load statistikAdmin ' + id));
        req.statadmin = statadmin;
        next();
    });
};

/**
 * Statistik authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.statadmin.user.id !== req.user.id) {
        return res.send(403, {
            message: 'User is not authorized'
        });
    }
    next();
};