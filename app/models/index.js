const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.taskers = require("./tasker.model.js")(mongoose);
db.customers = require("./customer.model.js")(mongoose);
db.admins = require("./admin.model.js")(mongoose);
db.teams = require("./team.model.js")(mongoose);
db.carts = require("./cart.model.js")(mongoose);
module.exports = db;
