'user strict';

const sqlKey = require('../../sql.json')

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    // TEST
    // host: 'localhost',
    // user: 'root',
    // PROD
    host: 'vv98893-001.dbaas.ovh.net',
    port: 35385,
    user: 'admin',
    password: 'L0CK3RSs',
    database: 'TACTIP'
});

connection.connect(function (err) {
    if (err) {
        throw err
    } else {
        console.log(`Server is connected to DB.`);
    };
});

module.exports = connection;