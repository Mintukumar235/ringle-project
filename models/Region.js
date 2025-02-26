const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Region = sequelize.define("Region", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  countryName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "India",
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "INR",
  },
  countryCode: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "+91",
  },
  amountLevel: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 50.00,
  },
}, {
  tableName: "regions",
  timestamps: true,
});

module.exports = Region;