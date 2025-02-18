const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  device: DataTypes.STRING,
  deviceToken: DataTypes.STRING,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
  city: DataTypes.STRING,
  address: DataTypes.TEXT,
  pincode: DataTypes.STRING,
  regionId: DataTypes.INTEGER,
}, {
  tableName: "users",
  timestamps: true,
});

module.exports = User;