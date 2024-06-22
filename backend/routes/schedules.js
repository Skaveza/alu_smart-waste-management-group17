const express = require("express");
const { WasteCollection } = require("../models");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

router.use(authenticateToken);

// Schedule a new waste collection
router.post("/", async (req, res) => {
  try {
    const { date, time } = req.body;
    const userId = req.user.id;
    const newCollection = await WasteCollection.create({ date, time, userId });
    res.status(201).json(newCollection);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error scheduling waste collection: " + error.message });
  }
});

// Get all schedules for a user
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const collections = await WasteCollection.findAll({ where: { userId } });
    res.json(collections);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving schedules: " + error.message });
  }
});

// Update an existing schedule
router.put("/:id", async (req, res) => {
  try {
    const { date, time } = req.body;
    const { id } = req.params;
    const updated = await WasteCollection.update(
      { date, time },
      { where: { id, userId: req.user.id } }
    );
    res.json({ message: "Schedule updated successfully", updated });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating schedule: " + error.message });
  }
});

// Delete a schedule
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await WasteCollection.destroy({ where: { id, userId: req.user.id } });
    res.json({ message: "Schedule cancelled successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error cancelling schedule: " + error.message });
  }
});

module.exports = router;
