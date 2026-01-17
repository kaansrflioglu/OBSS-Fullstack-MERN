const express = require("express");
const router = express.Router();

const controller = require("../controllers/sports.controller");

const auth = require("../middlewares/auth.middleware");

router.use(auth);

router.get("/", controller.getSports);
router.post("/", controller.createSport);
router.put("/:id", controller.updateSport);
router.delete("/:id", controller.deleteSport);

module.exports = router;