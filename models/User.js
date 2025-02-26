const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Region = require("./Region");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  regionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // Default India
    references: {
      model: "regions",
      key: "id",
    },
  },
}, {
  tableName: "users",
  timestamps: true,
});

// Define relationships
User.belongsTo(Region, { foreignKey: "regionId", as: "region" });

module.exports = User;
