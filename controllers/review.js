const db = require('../models');
const Review = db.Review;
const User = db.User;

// Create review
exports.create = async (req, res) => {
  try {
    const reviewData = {
      ...req.body,
      user_id: req.userId
    };

    const newReview = await Review.create(reviewData);
    res.status(201).send({
      status: true,
      message: "Success",
      data: newReview
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while creating the Review.",
      data: null
    });
  }
}

// Get reviews ordered by newest
exports.findAllOrderedByNewest = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        as: 'user',
        attributes: ['user_id', 'email', 'full_name']
      }]
    });
    res.status(200).send({
      status: true,
      message: "Success",
      data: reviews
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while retrieving reviews.",
      data: null
    });
  }
}

// Delete review
exports.delete = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      return res.status(404).send({
        status: false,
        message: `Review not found with id ${req.params.reviewId}`,
        data: null
      });
    }

    if (review.user_id !== req.userId) {
      return res.status(403).send({
        status: false,
        message: "Unauthorized",
        data: null
      });
    }

    await review.destroy();
    res.status(200).send({
      status: true,
      message: "Success",
      data: null
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while deleting the Review.",
      data: null
    });
  }
}
