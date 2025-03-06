const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

// GET all candidates (only those who applied)
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching candidates.", error: error.message });
  }
});

module.exports = router;
