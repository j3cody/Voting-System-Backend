const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Candidate = require("../models/Candidate");

// Set voting window timings (for testing, window is open now)
const votingStart = new Date(Date.now() - 1000 * 60 * 5); // started 5 minutes ago
const votingEnd = new Date(Date.now() + 1000 * 60 * 60);  // ends in one hour
console.log("vote working");
// Voting endpoint
// Expects JSON body: { scholarNo: "studentScholarNo", candidateId: "candidateID" }
router.post("/", async (req, res) => {
  const { scholarNo, candidateId } = req.body;
  try {
    const now = new Date();
    if (now < votingStart || now > votingEnd) {
      return res.status(400).json({ message: "Voting is not open at this time." });
    }
    const student = await Student.findOne({ scholarNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    if (student.hasVoted) {
      return res.status(400).json({ message: "You have already voted." });
    }
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found." });
    }
    candidate.votes += 1;
    await candidate.save();
    student.hasVoted = true;
    student.votedCandidate = candidate._id;
    await student.save();
    res.json({ message: "Vote recorded successfully.", candidate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Voting failed.", error: error.message });
  }
});

module.exports = router;
