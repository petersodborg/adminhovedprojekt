/**
 * Created by petersodborgchristensen on 08/05/2016.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Aktivitet = mongoose.model('Aktivitet'),
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
                message = 'Aktivitet eksisterer allerede';
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
 * Create a aktivitet
 */
exports.create = function(req, res) {
    var aktivitet = new Aktivitet(req.body);
    aktivitet.user = req.user;

    aktivitet.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(aktivitet);
        }
    });
};


/**
 * Show the current aktivitet
 */
exports.read = function(req, res) {
    res.jsonp(req.aktivitet);
};

/**
 * Delete an aktivitet
 */
exports.delete = function(req, res) {
    var aktivitet = req.aktivitet;

    aktivitet.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(aktivitet);
        }
    });
};
/*
 Update et land
 */
exports.update = function(req, res) {
    var aktivitet = req.aktivitet;

    aktivitet = _.extend(aktivitet, req.body);

    aktivitet.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(aktivitet);
        }
    });
};


/**
 * Liste aktivitet
 */
exports.list = function(req, res) {
    Aktivitet.find().sort('Title').populate('user', 'TagCategoryID').exec(function(err, aktiviteter) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(aktiviteter);
        }
    });
};
/**
 * Paginate List aktiviteter
 **/
exports.aktivitetList = function(req, res){

    if(!req.params.page)
    {
        var page = 1;
    }else{
        var page = req.params.page;
    }
    var per_page =10;

    Aktivitet.find().sort('-created').skip((page-1)*per_page).limit(per_page).populate('user', 'displayName').exec(function(err, aktiviteter) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(aktiviteter);
        }
    });

};

/**
 * aktiviteter middleware
 */
exports.aktivitetByID = function(req, res, next, id) {
    Aktivitet.findById(id).populate('user', 'displayName').exec(function(err, aktivitet) {
        if (err) return next(err);
        if (!aktivitet) return next(new Error('Failed to load aktivitet ' + id));
        req.aktivitet = aktivitet;
        next();
    });
};


/**
 * aktivitet authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.aktivitet.user.id !== req.user.id) {
        return res.send(403, {
            message: 'User er ikke authoriseret'
        });
    }
    next();
};
