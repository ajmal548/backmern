const express = require("express");
const router = express.Router();
const model = require("../schema/categorySchema");
const { createCategory, updateCategory } = require("../Middleware/middCategory");

router.post("/", createCategory, (req, res) => {
    res.json(data);
  });
  
  router.get("/:_id", async (req, res) => {
    const data = await model.findOne({ _id: req.params._id });
    res.send(data);
  });
  
  router.put("/:_id", updateCategory, async (req, res) => {
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