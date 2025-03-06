const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scholarNo: { type: String, unique: true, sparse: true },
  manifesto: { type: String },
  votes: { type: Number, default: 0 }
});

module.exports = mongoose.model("Candidate", candidateSchema);
