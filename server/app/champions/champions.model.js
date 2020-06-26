'use strict';
var dbConn = require('../config/config');

//Employee object create
var Champion = function (champion) {
  this.name = champion.name;
  this.cost = champion.cost;
  this.traits = champion.traits;
  this.items = champion.items;
  this.carry = champion.carry;
};

Champion.create = function (newEmp, result) {
  dbConn.query("INSERT INTO champions set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Champion.findByName = function (name, result) {
  dbConn.query("Select * from champions where name = ? ", name, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Champion.findAll = function (result) {
  dbConn.query("Select * from champions ORDER BY cost ASC, name ASC", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Champion.update = function (name, champion, result) {
  dbConn.query("UPDATE champions SET items=?,carry=? WHERE name = ?", [champion.items, champion.carry, name], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Champion.delete = function (name, result) {
  dbConn.query("DELETE FROM champions WHERE name = ?", [name], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Champion;