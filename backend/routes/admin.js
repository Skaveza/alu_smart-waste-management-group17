const express = require("express");
const { WasteCollection, RecyclingEntry, User } = require("../models");
const { authenticateToken, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.use(authenticateToken);
router.use(isAdmin);

router.get("/recycling", async (req, res) => {
  try {
    const recyclingEntries = await RecyclingEntry.findAll({
      include: {
        model: User,
        attributes: ["firstname", "lastname", "email"],
      },
    });
    res.json(recyclingEntries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving recycling entries: " + error.message });
  }
});

router.get("/schedules", async (req, res) => {
  try {
    const schedules = await WasteCollection.findAll({
      include: {
        model: User,
        attributes: ["firstname", "lastname", "email"],
      },
    });
    res.json(schedules);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving schedules: " + error.message });
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstname", "lastname", "email", "address", "role"],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users: " + error.message });
  }
});

module.exports = router;
