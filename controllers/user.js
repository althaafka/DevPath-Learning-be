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
    delete user.password
    res.status(201).send({
      status: true,
      message: "Success",
      data: user
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
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    delete user.password

    res.status(200).send({
      status: true,
      message: "Success",
      data: { token, user }
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
    res.status(200).send({
      status: true,
      message: "Success",
      data: users
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
    delete user.password
    res.status(200).send({
      status: true,
      message: "Success",
      data: user
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while retrieving user.",
      data: null
    });
  }
}