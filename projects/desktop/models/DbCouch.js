var config = require("../config/config");
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster(config.couchbase.server);
var bucket = cluster.openBucket(config.couchbase.bucket);
var bmanager = bucket.manager(config.couchbase.username, config.couchbase.password);


module.exports = function(couchbase, DataTypes) {
  var DbCouch = couchbase.define("DbCouch", {
    id: { type : DataTypes.INTEGER},
    address: DataTypes.STRING,
    age: DataTypes.INTEGER
  });
  return DbCouch;
};

bmanager.insertDesignDocument( 'dev_dbcouch_designdoc', {
views: {'dev_dbcouch_by_name' : {map: function (doc, meta) {if (doc._class == "DbCouch") {emit(null, null);}}}}
}, function(err){ 
if(err) { 
console.log('ERROR', err); }else{ }}); 