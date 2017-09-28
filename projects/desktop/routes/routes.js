var express = require("express");
var api = express.Router();
var routers = require("./routers")
api.use("/DbCouch_Default_Activity", routers.DbCouch_Default_ActivityRouter);

module.exports = api;