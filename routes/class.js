const express = require('express');
const classes = require("../controllers/class.js");
const authenticate = require('../middlewares/auth.js');
const authorize = require('../middlewares/authorize.js');
const router = express.Router();

router.post("/", authenticate, authorize(['admin', 'teacher']), classes.create);
router.get("/", authenticate, classes.findAll);
router.get("/:classId", authenticate, classes.findOne);
router.get("/teacher/:userId", authenticate, classes.findClassByTeacherId);
router.put("/:classId", authenticate, authorize(['admin', 'teacher']), classes.update);
router.delete("/:classId", authenticate, authorize(['admin', 'teacher']), classes.delete);


module.exports = app => {
  app.use('/class', router);
};
