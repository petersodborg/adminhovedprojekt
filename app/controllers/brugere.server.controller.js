/**
 * Created by petersodborgchristensen on 06/05/2016.
 */
//bruges til liste af users

/**
 * Created by petersodborgchristensen on 25/04/2016.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Brugere = mongoose.model('User'),
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
                message = 'User already exists';
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
 * Show the current user
 */
exports.read = function(req, res) {
    res.jsonp(req.user);
};

/**
 * Show the current user
 */
exports.read = function(req, res) {
    res.jsonp(req.user);
};


/**
 * List of Users
 */
exports.list = function(req, res) {
    Brugere.find().sort('-created').populate('user', 'username').exec(function(err, user) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * Update a user
 */
exports.update = function(req, res) {
    var user = req.user;

    user = _.extend(user, req.body);

    user.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
    Brugere.findById(id).populate('user', 'username').exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user ' + id));
        req.user = user;
        next();
    });
};

/**
 * User authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.user.user.id !== req.user.id) {
        return res.send(403, {
            message: 'User is not authorized'
        });
    }
    next();
};