module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
  
      Comment.belongsTo(models.Class, {
        foreignKey: 'class_id',
        as: 'class'
      });
    };
  
    return Comment;
  };
  