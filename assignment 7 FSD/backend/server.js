const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


const feedbackRoutes = require("./routes/feedbackRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/feedbackdb";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected via server.js entrypoint"))
  .catch((err) => console.error("❌ MongoDB error:", err));


app.use("/api", feedbackRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API Server running on port ${PORT}`));
