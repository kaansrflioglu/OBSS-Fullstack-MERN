const express = require("express");
const router = express.Router();

const controller = require("../controllers/parent.controller");

const auth = require("../middlewares/auth.middleware");

router.use(auth);

router.get("/", controller.getParents);
router.post("/", controller.createParent);
router.put("/:id", controller.updateParent);
router.delete("/:id", controller.deleteParent);

module.exports = router;