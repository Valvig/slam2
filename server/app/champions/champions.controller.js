'use strict';
const Champion = require('./champions.model');

exports.findAll = function (req, res) {
    Champion.findAll(function (err, champion) {
        console.log('controller champion')
        if (err)
            res.send(err);
        res.send(champion);
    });
};

exports.create = function (req, res) {
    const new_champion = new Champion(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Champion.create(new_champion, function (err, champion) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "Champion added successfully!",
                data: champion
            });
        });
    }
};

exports.findByName = function (req, res) {
    Champion.findByName(req.params.name, function (err, champion) {
        if (err)
            res.send(err);
        res.json(champion);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Champion.update(req.params.name, new Champion(req.body), function (err, champion) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Champion successfully updated'
            });
        });
    }
};

exports.delete = function (req, res) {
    Champion.delete(req.params.name, function (err, champion) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Champion successfully deleted'
        });
    });
};