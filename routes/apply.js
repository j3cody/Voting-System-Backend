// routes/apply.js
const express = require("express");
const router = express.Router();
const CandidateApplication = require("../models/CandidateApplication");
const Candidate = require("../models/Candidate");

router.post("/", async (req, res) => {
  console.log("Received application data:", req.body);
  const { candidateName, scholarNo, manifesto } = req.body;
  try {
    // Check if this scholar has already applied
    const existingApplication = await CandidateApplication.findOne({ scholarNo });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied." });
    }
    // Save the candidate application in its collection
    const application = new CandidateApplication({ candidateName, scholarNo, manifesto });
    await application.save();

    // Create a candidate record for voting
    const candidate = new Candidate({ name: candidateName, scholarNo, manifesto });
    await candidate.save();

    res.status(201).json({ message: "Application submitted successfully!", candidate });
  } catch (error) {
    console.error("Error in application submission:", error);
    res.status(500).json({ message: "Application submission failed.", error: error.message });
  }
});

module.exports = router;
