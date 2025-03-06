// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Student = require("../models/Student");

// Registration endpoint
router.post("/register", async (req, res) => {
  const { name, scholarNo, phone, email, password } = req.body;

  // Validate that a password is provided
  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

  try {
    // Hash the provided password
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      name,
      scholarNo,
      phone,
      email,
      password: hashedPassword
    });
    await student.save();
    res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Registration failed.", error: error.message });
  }
});
// routes/auth.js (continued)
router.post("/login", async (req, res) => {
  const { scholarNo, name, password } = req.body;
  try {
    const student = await Student.findOne({ scholarNo, name });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    // Compare provided password with stored hash
    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // In production, consider issuing a JWT token
    res.json({ message: "Login successful.", user: student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error.", error: error.message });
  }
});


module.exports = router;
