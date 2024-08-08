const db = require('../models');
const Comment = db.Comment;
const Class = db.Class;
const User = db.User;

// Create comment
exports.create = async (req, res) => {
  try {
    const commentData = {
      ...req.body,
      user_id: req.userId,
      class_id: req.params.classId
    };

    const newComment = await Comment.create(commentData);
    res.status(201).send({
      status: true,
      message: "Success",
      data: newComment
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while creating the Comment.",
      data: null
    });
  }
}

// Get comments by class
exports.findByClass = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { class_id: req.params.classId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['user_id', 'email', 'full_name']
      }]
    });
    res.status(200).send({
      status: true,
      message: "Success",
      data: comments
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while retrieving comments.",
      data: null
    });
  }
}

// Delete comment
exports.delete = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment) {
      return res.status(404).send({
        status: false,
        message: `Comment not found with id ${req.params.commentId}`,
        data: null
      });
    }

    if (comment.user_id !== req.userId) {
      return res.status(403).send({
        status: false,
        message: "Unauthorized",
        data: null
      });
    }

    await comment.destroy();
    res.status(200).send({
      status: true,
      message: "Success",
      data: null
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while deleting the Comment.",
      data: null
    });
  }
}
