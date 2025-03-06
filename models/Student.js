const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scholarNo: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hasVoted: { type: Boolean, default: false },
  votedCandidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", default: null },
});

module.exports = mongoose.model("Student", studentSchema);
