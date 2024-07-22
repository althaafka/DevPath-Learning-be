const db = require('../models');
const User = db.User;

exports.create = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    const userData = {
        ...req.body,
        password: hashedPassword
    }
    const user = await User.create(userData);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User."
    });
  }
};