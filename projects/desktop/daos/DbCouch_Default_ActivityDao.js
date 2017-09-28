var models = require("../models/DbCouch");
var PropertiesReader = require('properties-reader');
var config = require("../config/config");
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster(config.couchbase.server);
var uuid = require("uuid");
var N1qlQuery = require('couchbase').N1qlQuery;
var bucket = cluster.openBucket(config.couchbase.bucket);
var bmanager = bucket.manager(config.couchbase.username, config.couchbase.password);
module.exports.create_DbCouch = function(DbCouch,callback) {

   var documentId =DbCouch.document_id ? DbCouch.document_id : uuid.v4();
   var jsonObject = {
   id:documentId,
   _class:"DbCouch",
   	address : DbCouch.address,
   	age : DbCouch.age,
   	created_by : 0,
   	updated_by : 0
   }
   bucket.insert(documentId,jsonObject, function(error,dbcouch){
    if(error) {
   callback(error, null);
   return;
   }
   callback({message: "success",DbCouch:dbcouch});});  
}
module.exports.update_DbCouch = function(DbCouch,callback) {

   var jsonObject = {
   _class:"DbCouch",
   	id : DbCouch.id,
   	address : DbCouch.address,
   	age : DbCouch.age,
   	updated_by : 0
   }
   bucket.upsert(DbCouch.id,jsonObject, function(error,dbcouch){
    if(error) {
   callback(error, null);
   return;
   }
   callback({message: "success",DbCouch:dbcouch});});  
}
module.exports.search_DbCouch_for_update = function(DbCouch_id,callback) {

    var statement = "SELECT * " +
   "FROM `" + config.couchbase.bucket + "` AS dev_dbcouch_by_name " +
   "WHERE META(dev_dbcouch_by_name).id ='"+DbCouch_id+"'";
   var query = N1qlQuery.fromString(statement);
   bucket.query(query,[DbCouch_id], function(error,dbcouch) { 
   if(error) { 
    return callback(error, null); 
   }
   callback(dbcouch); 
   }); 
}
module.exports.delete_DbCouch = function(DbCouch_id,callback) {

   bucket.remove(DbCouch_id, function(error,dbcouch) { 
   if(error) { 
    return callback(error, null); 
   }
   callback(dbcouch); 
   }); 
}
module.exports.get_all_DbCouch = function(callback) {

   var statement = "SELECT * FROM `" + config.couchbase.bucket + "` AS dev_dbcouch_by_name";
   var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
   bucket.query(query, function(error, dbcouch) { 
   if(error) { 
    return callback(error, null); 
   }
   callback(dbcouch); 
   }); 
}

var primary = "CREATE PRIMARY INDEX ON `"+ config.couchbase.bucket +"` USING GSI;";
var query = N1qlQuery.fromString(primary).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
bucket.query(query, function(error, result) {});

   