'use strict';
var dbConn = require('../config/config');

//Employee object create
var Item = function (item) {
  this.name = item.name;
  this.id = item.id;
};

Item.create = function (newItem, result) {
  dbConn.query("INSERT INTO items set ?", newItem, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Item.findByName = function (name, result) {
  dbConn.query("Select * from items where name = ? ", name, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Item.findAll = function (result) {
  dbConn.query("Select * from items", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Item.delete = function (name, result) {
  dbConn.query("DELETE FROM items WHERE name = ?", [name], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Item;