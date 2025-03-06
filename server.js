// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Import your routes
const authRoutes = require("./routes/auth");
const candidateRoutes = require("./routes/candidates");
const voteRoutes = require("./routes/vote");
const applyRoutes = require("./routes/apply"); // Import the apply route

// Use routes
app.use("/api", authRoutes);              // for /api/register and /api/login
app.use("/api/candidates", candidateRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/apply", applyRoutes);         // use the apply route

// Optional: Endpoint to check voting window details
const votingStart = new Date(Date.now() - 1000 * 60 * 5);
const votingEnd = new Date(Date.now() + 1000 * 60 * 60);
app.get("/api/voting-window", (req, res) => {
  res.json({
    votingStart,
    votingEnd,
    now: new Date(),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
