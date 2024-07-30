const express = require('express');
const membership = require("../controllers/class_membership.js");
const authenticate = require('../middlewares/auth.js');
const authorize = require('../middlewares/authorize.js');
const router = express.Router();

router.post("/add", authenticate, membership.addMembership);
router.get("/class/:class_id", authenticate, membership.getClassMembers);
router.get("/user/:user_id", authenticate, membership.getUserClasses);

module.exports = app => {
  app.use('/membership', router);
};
