const express = require('express');
const comments = require("../controllers/comment.js");
const authenticate = require('../middlewares/auth.js');
const router = express.Router();

router.post("/:classId", authenticate, comments.create);
router.get("/:classId", authenticate, comments.findByClass);
router.delete("/:commentId", authenticate, authorize(['self', 'admin']), comments.delete);

module.exports = app => {
  app.use('/comment', router);
};
