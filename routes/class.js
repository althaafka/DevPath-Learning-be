const express = require('express');
const classes = require("../controllers/class.js");
const authenticate = require('../middlewares/auth.js');
const authorize = require('../middlewares/authorize.js');
const router = express.Router();

router.post("/", authenticate, authorize(['admin', 'teacher']), classes.create);
router.get("/", authenticate, classes.findAll);


module.exports = app => {
  app.use('/class', router);
};
