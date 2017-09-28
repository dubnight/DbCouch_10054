var express = require("express");
var http = require("http");
var path = require("path");
var couchbase = require("couchbase");
var config = require("./config/config");
var logger = require("morgan");
var bodyParser = require('body-parser');
var app = express();
var clientPath = path.resolve(__dirname, "client");
var passport = require('passport');
var jwt = require('jwt-simple');
var auth = require('./auth/auth.js')();
var confJWT = require('./config/config.json').jwt;


var cluster = new couchbase.Cluster(config.couchbase.server);
var manager = cluster.manager(config.couchbase.username, config.couchbase.password);
manager.createBucket(config.couchbase.bucket, { flushEnabled: 0 }, function(err) {
});



app.use(bodyParser.json({limit: '50mb'}))
app.use(auth.initialize());

app.use(logger("dev"));
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Content-Length, Authorization, X-Requested-With, X-XSRF-TOKEN");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if ( req.method === 'OPTIONS' ) {
    console.log('OPTIONS SUCCESS');
    res.end();
  }
  next();
});

function timeout(arg) {

var N1qlQuery = require('couchbase').N1qlQuery;
var bucket = cluster.openBucket(config.couchbase.bucket);

app.post('/auth/login', function(req, res) {
	if (req.body.username && req.body.password) {
		var username = req.body.username;
		var passwd = req.body.password;
		var statement = "SELECT username,passwd FROM `"+config.couchbase.bucket+"` AS creds WHERE META(creds).id ='admin';";
		var query = N1qlQuery.fromString(statement); 
		bucket.query(query,["admin"], function(error,data) { 
				data.forEach(function(value){ 
		if (username==value.username && passwd==value.passwd){ 
			console.log(data);
			var user = data;
			if(user) {
			var payload = {
			id: user.id
			};
			var token = jwt.encode(payload, confJWT.jwtSecret);
			res.json({
			token: token,
			user: JSON.stringify(user)
			});
			}}else {
			res.sendStatus(401);
			}
			}); });
		} else {
		res.sendStatus(401);
	}
});


var router = require("./routes/routes");
app.use("/",express.static(clientPath));
app.use("/api", router);
app.all('*', function (req, res) { 
  res.status(200).sendFile(path.join(__dirname, '/client/index.html')); 
});

}
setTimeout(timeout, 4000, 'time');

//module.exports.bucket = (new couchbase.Cluster(process.env.COUCHBASE_HOST || config.couchbase.server)).openBucket(process.env.COUCHBASE_BUCKET || config.couchbase.bucket);

var server = app.listen(process.env.COUCHBASE_PORT || 8080, function () {
    console.log("Listening on port %s...", server.address().port);
});