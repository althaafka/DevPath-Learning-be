const express = require('express');
const authenticate = require('../middlewares/auth.js');
const authorize = require('../middlewares/authorize.js');
const router = express.Router();

module.exports = app => {
  app.use('/class', router);
};
