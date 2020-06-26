'use strict';
const Item = require('./items.model');

exports.findAll = function (req, res) {
    Item.findAll(function (err, item) {
        console.log('controller item')
        if (err)
            res.send(err);
        res.send(item);
    });
};

exports.create = function (req, res) {
    const new_item = new Item(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Item.create(new_item, function (err, champion) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "Item added successfully!",
                data: champion
            });
        });
    }
};

exports.findByName = function (req, res) {
    Item.findByName(req.params.name, function (err, champion) {
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
        Item.update(req.params.name, new Item(req.body), function (err, champion) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Item successfully updated'
            });
        });
    }
};

exports.delete = function (req, res) {
    Item.delete(req.params.name, function (err, champion) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Item successfully deleted'
        });
    });
};