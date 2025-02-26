const sequelize = require("../db");
const Region = require("../models/Region"); // ✅ Import Region directly

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });

    await Region.findOrCreate({
      where: { id: 1 },
      defaults: {
        countryName: "India",
        currency: "INR",
        countryCode: "+91",
        amountLevel: 50.00,
      },
    });

    console.log("✅ Database synced successfully");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
}

module.exports = syncDatabase;
