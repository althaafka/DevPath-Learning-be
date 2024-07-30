const express = require('express');
const membership = require("../controllers/class_membership.js");
const authenticate = require('../middlewares/auth.js');
const authorize = require('../middlewares/authorize.js');
const router = express.Router();

router.post("/add", authenticate, authorize(['admin', 'teacher', 'student']), membership.addMembership);

module.exports = app => {
  app.use('/membership', router);
};
