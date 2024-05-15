const express = require("express");
const router = express.Router();
const { createPayment, updatePayment } = require("../Middleware/middPayment");
const model = require("../schema/paymentSchema");

router.post("/", createPayment, (req, res) => {
  res.json(data);
});

router.get("/:_id", async (req, res) => {
  const data = await model.findOne({ _id: req.params._id });
  res.send(data);
});

router.put("/:_id", updatePayment, async (req, res) => {
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
