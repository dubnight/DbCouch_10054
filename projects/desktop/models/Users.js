'use strict';

var config = require("../config/config");
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster(config.couchbase.server);
var bucket = cluster.openBucket(config.couchbase.bucket);
var bmanager = bucket.manager(config.couchbase.username, config.couchbase.password);
var N1qlQuery = require('couchbase').N1qlQuery;


module.exports = function(couchbase, DataTypes) {
var Users = couchbase.define("User", {
    //id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
},
 {
    timestamps: false,  
    instanceMethods: {
      toJSON: function () {
        var values = Object.assign({}, this.get());

        delete values.password;
        delete values.enabled;
        delete values.id;
        return values;
      }
    }
});
return Users;
};


function timeout(arg) {
var statement = "INSERT INTO `" + config.couchbase.bucket + "` (KEY, VALUE) VALUES ( \"admin\", { \"username\": \"admin\","+
                         "\"passwd\" : \"admin\", \"role\":\"ROLE_ADMIN\"  } ) ";
var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
   bucket.query(query, function(error, nodlog) { 
   }); 
}
setTimeout(timeout, 4000, 'time');