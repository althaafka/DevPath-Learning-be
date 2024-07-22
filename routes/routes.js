const express = require('express');
const users = require("../controllers/user.js");
const authenticate = require('../middlewares/auth.js');
const authorize = require('../middlewares/authorize.js');
const router = express.Router();

router.post("/register", users.create);
router.post("/login", users.login);

router.get("/", authenticate, authorize(['admin']), users.findAll);

module.exports = app => {
  app.use('/user', router);
};