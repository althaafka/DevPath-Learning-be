module.exports = app => {
    const users = require("../controllers/user.js");
    var router = require("express").Router();
  
    router.post("/register", users.create);
  
    app.use('/user', router);
  };
  