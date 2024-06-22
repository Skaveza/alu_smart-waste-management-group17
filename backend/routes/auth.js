const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

// Registration Endpoint
router.post("/register", async (req, res) => {
  const { firstname, lastname, address, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Create new user
    const newUser = await User.create({
      firstname,
      lastname,
      address,
      email,
      password: hash,
      role: "user", // Default role
    });

    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: { id: newUser.id, email: newUser.email },
      });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Error registering new user." });
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Compare password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    // Create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user." });
  }
});

// Protected route to get user details
router.get("/details", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    res.json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user details." });
  }
});

module.exports = router;
