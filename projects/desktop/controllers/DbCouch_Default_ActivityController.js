var service = require("../services/DbCouch_Default_ActivityService")
module.exports.create_DbCouch = function(req, res) {
  var DbCouch = req.body;
  service.create_DbCouch(DbCouch,function (dbcouch){
    res.status(201);
    res.json(dbcouch);
  });
}
module.exports.update_DbCouch = function(req, res) {
  var DbCouch = req.body;
  service.update_DbCouch(DbCouch,function (dbcouch){
    res.json(dbcouch);
  });
}
module.exports.search_DbCouch_for_update = function(req, res) {
  var DbCouch_id = req.params.id;
  service.search_DbCouch_for_update(DbCouch_id,function (dbcouch){
    res.json(dbcouch);
  });
}
module.exports.delete_DbCouch = function(req, res) {
  var DbCouch_id = req.params.id;
  service.delete_DbCouch(DbCouch_id,function (dbcouch){
    res.status(204);
    res.json(dbcouch);
  });
}
module.exports.get_all_DbCouch = function(req, res) {
  service.get_all_DbCouch(function (dbcouch){
    res.json(dbcouch);
  });
}