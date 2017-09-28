var express = require("express");
var router = express.Router();
var controller = require("../../controllers/DbCouch_Default_ActivityController")
router.post("/DbCouch", controller.create_DbCouch);
router.get("/DbCouch/:id", controller.search_DbCouch_for_update);
router.put("/DbCouch", controller.update_DbCouch);
router.delete("/DbCouch/:id", controller.delete_DbCouch);
router.get("/DbCouch", controller.get_all_DbCouch);

module.exports = router;