/**
 * Created by petersodborgchristensen on 05/04/16.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Operator = mongoose.model('Operator'),
    Land = mongoose.model('Land'),
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
                message = 'Operator eksisterer allerede';
                break;
            default:
                message = 'Noget gik galt!';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

/**
 * Create a testoperators
 */
exports.create = function(req, res) {
    var operator = new Operator(req.body);
    operator.user = req.user;


    //operator.operatorNavn = req.operatorNavn;

    operator.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(operator);
        }
    });
};

/**
 * Show the current testoperators
 */
exports.read = function(req, res) {
    res.jsonp(req.operator);
};

/**
 * Update a testoperators
 */
exports.update = function(req, res) {
    var operator = req.operator;

    operator = _.extend(operator, req.body);

    operator.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(operator);
        }
    });
};

/**
 * Delete an testoperators
 */
exports.delete = function(req, res) {
    var operator = req.operator;

    operator.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(operator);
        }
    });
};

/**
 * List of Operators
 */
exports.list = function(req, res) {
    Operator.find().sort('-created').populate('user', 'displayName').exec(function(err, operators) {
        Land.find().sort('-created').populate('user', 'displayName').exec(function(err, lande){
            //var all = lande.concat(operators);
            res.jsonp(operators);
        });
    });
};
//pagination list
exports.operatorList = function(req, res){

    if(!req.params.page)
    {
        var page = 1;
    }else{
        var page = req.params.page;
    }
    var per_page =10;

    Operator.find().sort('-created').skip((page-1)*per_page).limit(per_page).populate('user', 'operatorNavn').exec(function(err, operators) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(operators);
        }
    });

};

/**
 * Operator middleware
 */
exports.operatorByID = function(req, res, next, id) {
    Operator.findById(id).populate('land', 'Navn').exec(function(err, operator) {
        if (err) return next(err);
        if (!operator) return next(new Error('Failed to load testoperators ' + id));
        req.operator = operator;
        next();
    });
};

/**
 * Operator authorization middleware
 */

exports.hasAuthorization = function(req, res, next) {
    if (req.operator.user.id !== req.user.id) {
        return res.send(403, {
            message: 'User is not authorized'
        });
    }
    next();
};

