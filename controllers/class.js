const db = require('../models');
const Class = db.Class;
const User = db.User;

// Create class
exports.create = async (req, res) => {
    try {
        const classData = {
            ...req.body,
            userId: req.userId
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
        const classes = await Class.findAll()
        res.status(200).send({
            status: true,
            message: "Success",
            data: classes
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message || "Some error occurred while retrieving classes.",
            data: null
        });
    }
}