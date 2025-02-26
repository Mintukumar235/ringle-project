const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const UserType = sequelize.define("UserType", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: "user_types",
  timestamps: true,
});

module.exports = UserType;
