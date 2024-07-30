const db = require('../models');
const Class = db.Class;
const User = db.User;

// Create class
exports.create = async (req, res) => {
    try {
        const classData = {
            ...req.body,
            user_id: req.userId
        };

        const newClass = await Class.create(classData);
        res.status(201).send({
            status: true,
            message: "Success",
            data: newClass
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message || "Some error occurred while creating the Class.",
            data: null
        });
    }
}

// Find all class
exports.findAll = async (req, res) => {
    try {
      const classes = await Class.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'full_name']
        }]
      });
      res.status(200).send({
        status: true,
        message: "Success",
        data: classes
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: error.message || "Some error occurred while retrieving classes",
        data: null
      });
    }
  };
  
// Find class by Id
exports.findOne = async (req, res) => {
  try {
    const classData = await Class.findByPk(req.params.classId, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['user_id', 'email', 'full_name']
      }]
    });
    if (!classData) {
      return res.status(404).send({
        status: false,
        message: `Class not found with id ${req.params.classId}`,
        data: null
      });
    }
    res.status(200).send({
      status: true,
      message: "Success",
      data: classData
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while retrieving class",
      data: null
    });
  }
};
  

exports.findClassByTeacherId = async (req, res) => {
  try {
    const teacherId = req.params.userId;
    const classes = await Class.findAll({
      where: { user_id: teacherId},
      include: [{
        model: User,
        as: 'user',
        attributes: ['user_id', 'email', 'full_name']
      }]
    });

    res.status(200).send({
      status: true,
      message: "Success",
      data: classes
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while retrieving classes",
      data: null
    });
  }
}

exports.update = async (req, res) => {
  try {
    const classData = await Class.findByPk(req.params.classId);
    if (!classData) {
      return res.status(404).send({
        status: false,
        message: `Class not found with id ${req.params.classId}`,
        data: null
      });
    }

    if (classData.user_id !== req.userId) {
      return res.status(403).send({
        status: false,
        message: "Unauthorized",
        data: null
      });
    }

    await classData.update(req.body);
    res.status(200).send({
      status: true,
      message: "Success",
      data: classData
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while updating the Class.",
      data: null
    });
  }
}

exports.delete = async (req, res) => {
  try {
    const classData = await Class.findByPk(req.params.classId);
    if (!classData) {
      return res.status(404).send({
        status: false,
        message: `Class not found with id ${req.params.classId}`,
        data: null
      });
    }

    if (classData.user_id !== req.userId) {
      return res.status(403).send({
        status: false,
        message: "Unauthorized",
        data: null
      });
    }

    await classData.destroy();
    res.status(200).send({
      status: true,
      message: "Success",
      data: null
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message || "Some error occurred while deleting the Class.",
      data: null
    });
  }
}