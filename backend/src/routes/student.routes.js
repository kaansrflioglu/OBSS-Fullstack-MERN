const express = require("express");
const router = express.Router();

const controller = require("../controllers/student.controller");

const auth = require("../middlewares/auth.middleware");

router.use(auth);

router.get("/", controller.getStudents);
router.post("/", controller.createStudent);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);

module.exports = router;