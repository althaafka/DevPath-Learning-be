const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User register
exports.create = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 11);

    const userData = {
      ...req.body,
      password: hashedPassword,
      expertise: req.body.role === 'teacher' ? req.body.expertise : null
    };

    const user = await User.create(userData);
    const userResponse = { ...user.toJSON() };
    delete userResponse.password
    res.status(201).send({
      status: true,
      message: "Success",
      data: userResponse
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while creating the User.",
      data: null
    });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User Not found.",
        data: null
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        status: false,
        message: "Invalid password.",
        data: null
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    const userResponse = { ...user.toJSON() };
    delete userResponse.password

    res.status(200).send({
      status: true,
      message: "Success",
      data: { token, userResponse }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while login.",
      data: null
    });
  }
}

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    const usersResponse = users.map(user => {
      const userObj = user.toJSON();
      delete userObj.password;
      return userObj;
    });
    res.status(200).send({
      status: true,
      message: "Success",
      data: usersResponse
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while retrieving users.",
      data: null
    });
  }
}

exports.findOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User Not found.",
        data: null
      });
    }
    const userResponse = { ...user.toJSON() };
    delete userResponse.password
    res.status(200).send({
      status: true,
      message: "Success",
      data: userResponse
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while retrieving user.",
      data: null
    });
  }
}

// Update user by ID
exports.update = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 11);
    }

    const [updated] = await User.update(updateData, {
      where: { user_id: userId }
    });

    if (!updated) {
      return res.status(404).send({
        status: false,
        message: "User Not found.",
        data: null
      });
    }

    const updatedUser = await User.findByPk(userId);
    const userResponse = { ...updatedUser.toJSON() }; 
    delete userResponse.password

    res.status(200).send({
      status: true,
      message: "User updated successfully.",
      data: userResponse
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while updating user.",
      data: null
    });
  }
};

// Delete user by ID
exports.delete = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await User.destroy({
      where: { id: userId }
    });

    if (!deleted) {
      return res.status(404).send({
        status: false,
        message: "User Not found.",
        data: null
      });
    }

    res.status(200).send({
      status: true,
      message: "User deleted successfully.",
      data: null
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while deleting user.",
      data: null
    });
  }
};