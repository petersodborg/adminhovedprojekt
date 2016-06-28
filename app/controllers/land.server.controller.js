/**
 * Created by petersodborgchristensen on 08/05/2016.
 */
/**
 * Created by petersodborgchristensen on 27/04/2016.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
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
                message = 'Land eksisterer allerede';
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
 * Create a land
 */
exports.create = function(req, res) {
    var land = new Land(req.body);
    land.user = req.user;

    land.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(land);
        }
    });
};




/**
 * Show the current lande
 */
exports.read = function(req, res) {
    res.jsonp(req.land);
};

/**
 * Delete an land
 */
exports.delete = function(req, res) {
    var land = req.land;

    land.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(land);
        }
    });
};
/*
Update et land
 */
exports.update = function(req, res) {
    var land = req.land;

    land = _.extend(land, req.body);

    land.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(land);
        }
    });
};


/**
 * Liste lande
 */
exports.list = function(req, res) {
    Land.find().sort('landeNavn').populate('user', 'Region').exec(function(err, lande) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(lande);
        }
    });
};
//pagination list
exports.landeList = function(req, res){

    if(!req.params.page)
    {
        var page = 1;
    }else{
        var page = req.params.page;
    }
    var per_page =10;

    Land.find().sort('-created').skip((page-1)*per_page).limit(per_page).populate('user', 'displayName').exec(function(err, lande) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(lande);
        }
    });

};

/**
 * Lande middleware
 */
exports.landByID = function(req, res, next, id) {
    Land.findById(id).populate('user', 'landeNavn').exec(function(err, land) {
        if (err) return next(err);
        if (!land) return next(new Error('Failed to load land ' + id));
        req.land = land;
        next();
    });
};


/**
 * Lande authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.land.user.id !== req.user.id) {
        return res.send(403, {
            message: 'User er ikke authoriseret'
        });
    }
    next();
};
