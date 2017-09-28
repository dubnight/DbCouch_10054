var dao = require("../daos/DbCouch_Default_ActivityDao")
module.exports.create_DbCouch = function(DbCouch,callback) {
  dao.create_DbCouch(DbCouch,function (dbcouch){
    callback(dbcouch);
  });
}
module.exports.update_DbCouch = function(DbCouch,callback) {
  dao.update_DbCouch(DbCouch,function (dbcouch){
    callback(dbcouch);
  });
}
module.exports.search_DbCouch_for_update = function(DbCouch_id,callback) {
  dao.search_DbCouch_for_update(DbCouch_id,function (dbcouch){
    callback(dbcouch);
  });
}
module.exports.delete_DbCouch = function(DbCouch_id,callback) {
  dao.delete_DbCouch(DbCouch_id,function (dbcouch){
    callback(dbcouch);
  });
}
module.exports.get_all_DbCouch = function(callback) {
  dao.get_all_DbCouch(function (dbcouch){
    callback(dbcouch);
  });
}