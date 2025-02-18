const express = require("express");
const sequelize = require("./db");
const cors = require('cors')
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 2)Routes
sequelize.sync({ alter: true }) 
  .then(() => console.log("✅ Database synced successfully"))
  .catch((err) => console.error("❌ Error syncing database:", err));

app.use("/auth", authRoutes);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})
