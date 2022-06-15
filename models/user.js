const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(),
      unique: true,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN(),
      defaultValue: false
    }
  });
};
