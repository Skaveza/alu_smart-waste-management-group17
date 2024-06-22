const jwt = require("jsonwebtoken");
const { User } = require("../models");

const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error checking admin role: " + error.message });
  }
};

module.exports = { authenticateToken, isAdmin };
