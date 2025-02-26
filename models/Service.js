const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Region = require("./Region"); // Import Region model
const User = require("./User"); // Import User model

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: User, // Foreign key from User model
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discountType: {
    type: DataTypes.ENUM("percentage", "amount"),
    allowNull: false,
  },
  regionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Region, // Foreign key from Region model
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "services",
  timestamps: true,
});

module.exports = Service;
