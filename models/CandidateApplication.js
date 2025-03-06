const mongoose = require("mongoose");

const candidateApplicationSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  scholarNo: { type: String, required: true, unique: true },
  manifesto: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CandidateApplication", candidateApplicationSchema);
