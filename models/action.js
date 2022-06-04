const { DataTypes } = require("sequelize");

module.exports = sequelize => {
    sequelize.define("Action", {
        id: {
            type: DataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        body: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        img: {
            type: DataTypes.STRING(),
            allowNull: false
        }
    });
};