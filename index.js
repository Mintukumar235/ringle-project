const express = require("express");
const cors = require("cors");
const syncDatabase = require("./utils/syncDB"); 
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
syncDatabase();

app.use("/auth", authRoutes);
app.use("/services",serviceRoutes);
app.use("/users",userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
