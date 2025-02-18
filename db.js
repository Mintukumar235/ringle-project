const { Sequelize } = require("sequelize");

// To create a Sequelize instance with MySQL connection
const sequelize = new Sequelize("internship", "root", "Dhiraj@123", {
  host: "localhost",
  dialect: "mysql",
  logging:false
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error);
  }
})();

module.exports = sequelize;