module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('student', 'teacher', 'admin'),
      allowNull: false
    },
    expertise: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        isNullWhenStudent(value) {
          if (this.role === 'student' && value !== null) {
            throw new Error("Expertise must be null for students");
          }
        }
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Class, {
      foreignKey: 'user_id',
      as: 'classes'
    });
  };

  return User;
};
