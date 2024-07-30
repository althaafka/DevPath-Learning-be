const db = require('../models');
const ClassMembership = db.ClassMembership;
const Class = db.Class;
const User = db.User;

exports.addMembership = async (req, res) => {
  try {
    const { class_id, user_id } = req.body;
    const userId = user_id || req.userId;

    if (user_id && req.userId !== user_id) {
        return res.status(403).send({
            status: false,
            message: "You can't add membership for another user",
            data: null
        });
    }

    const classExists = await Class.findByPk(class_id);
    const userExists = await User.findByPk(userId);

    if (!classExists) {
      return res.status(404).send({
        status: false,
        message: `Class not found with id ${class_id}`,
        data: null
      });
    }

    if (!userExists) {
      return res.status(404).send({
        status: false,
        message: `User not found with id ${userId}`,
        data: null
      });
    }

    const existingMembership = await ClassMembership.findOne({
        where: { class_id, user_id: userId }
      });
  
      if (existingMembership) {
        return res.status(400).send({
          status: false,
          message: "User is already a member of the class",
          data: null
        });
      }

    const membership = await ClassMembership.create({ class_id, user_id: userId });
    res.status(201).send({
      status: true,
      message: "User successfully added to the class",
      data: membership
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while adding membership",
      data: null
    });
  }
};

exports.getClassMembers = async (req, res) => {
    try {
        const { class_id } = req.params;

        const classExists = await Class.findByPk(class_id);
        if (!classExists) {
            return res.status(404).send({
                status: false,
                message: `Class not found with id ${class_id}`,
                data: null
            });
        }

        const members = await ClassMembership.findAll({
            where: { class_id },
            include: [{
                model: User,
                as: 'user',
                attributes: ['user_id', 'email', 'full_name']
            }]
        });

        res.status(200).send({
            status: true,
            message: "Success",
            data: members
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message || "Some error occurred while retrieving class members",
            data: null
        });
    }
}