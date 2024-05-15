const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { createOrder, updateOrder } = require("../Middleware/middOrder");
const model = require("../schema/orderSchema");

router.post("/", createOrder, (req, res) => {
  res.json(data);
});
// admin token with get all orders
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== "admin") {
      res.status(403);
      return res.json({ message: "Access only admin" });
    }
    const data = await model
      .find()
      .populate({
        path: "product_id",
        select: "name brand",
        model: "Product",
      })
      .populate({
        path: "payments_id",
        select: "methode",
      })
      .exec();
    res.send(data);
  }
);
//token with get user order
router.get(
  "/:user_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== "user") {
      res.status(403);
      return res.json({ message: "Access only user" });
    }
    try {
      const order = await model
        .find({ user_id: req.params.user_id })
        .populate({
          path: "product_id",
          select: "name brand",
          model: "Product",
        })
        .populate({
          path: "payments_id",
          select: "methode",
        })
        .exec();

      if (!order) {
        return res.json({ message: "Order not found" });
      }
      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.put(
  "/:_id",
  updateOrder,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== "user") {
      res.status(403);
      return res.json({ message: "Access only user" });
    }
    res.send("Updated");
  }
);
router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== "user") {
      res.status(403);
      return res.json({ message: "Access only user" });
    }
    try {
      const data = await model.findOneAndDelete({ _id: req.params._id });
      res.send("deleted");
    } catch (err) {
      res.send(err);
    }
  }
);







module.exports = router;
