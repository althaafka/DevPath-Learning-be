module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    class_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    material: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Class.associate = (models) => {
    Class.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return Class;
};
