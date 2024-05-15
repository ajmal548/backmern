const express = require("express");
const router = express.Router();
const { createReview, updateReview } = require("../Middleware/middReview");
const model = require("../schema/reviewschema");

router.post("/", createReview, (req, res) => {
  res.json(data);
});

router.get("/:_id", async (req, res) => {
  const data = await model.findOne({ _id: req.params._id });
  res.send(data);
});

router.put("/:_id", updateReview, async (req, res) => {
  res.send("Updated");
});

router.delete("/:_id", async (req, res) => {
  try {
    const data = await model.findOneAndDelete({ _id: req.params._id });
    res.send("deleted");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
