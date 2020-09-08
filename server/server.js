const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const cron = require("node-cron");
const fs = require("fs");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 100 // limit each IP to 100 requests per windowMs
});

var run = require('./services/index.js');

// create express app
const app = express();

// Setup server port
const PORT = process.env.PORT || 8081;

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
//  apply to all requests
app.use(limiter);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to application Valentin."
  });
});

// Require champions routes
const championsRoutes = require('./app/champions/champions.routes')
const itemsRoutes = require('./app/items/items.routes')
const riotToutes = require('./app/riotApi/riotApi.routes')

// using as middleware
app.use('/api/champions', championsRoutes)
app.use('/api/items', itemsRoutes)
app.use('/api/riot', riotToutes)

module.exports = app;

cron.schedule("* * * * *", function() {
  // console.log("running a task everyday at 4pm");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// TEST ONLY
// run.workWithOldDatas()
run.getNewDatas()

