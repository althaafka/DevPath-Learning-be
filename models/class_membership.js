module.exports = (sequelize, DataTypes) => {
    const ClassMembership = sequelize.define('ClassMembership', {
      membership_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Classes', 
          key: 'class_id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      }
    });
  
    ClassMembership.associate = (models) => {
      ClassMembership.belongsTo(models.Class, {
        foreignKey: 'class_id',
        as: 'class'
      });
      ClassMembership.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    };
  
    return ClassMembership;
  };
  