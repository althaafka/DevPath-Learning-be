module.exports = app => {
    const users = require("../controllers/user.js");
    var router = require("express").Router();
  
    router.post("/register", users.create);
    router.post("/login", users.login);
  
    app.use('/user', router);
};
  