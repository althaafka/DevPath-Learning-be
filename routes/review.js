const express = require('express');
const reviews = require("../controllers/review.js");
const authenticate = require('../middlewares/auth.js');
const router = express.Router();

router.post("/", authenticate, reviews.create);

router.get("/", reviews.findAllOrderedByNewest);

router.delete("/:reviewId", authenticate, reviews.delete);

module.exports = app => {
  app.use('/reviews', router);
};