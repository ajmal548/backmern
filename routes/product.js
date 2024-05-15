const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { createProduct, updateProduct } = require("../Middleware/middProduct");
const model = require("../schema/productSchema");

router.post("/", createProduct, (req, res) => {
  res.json(data);
});
// authenticate with admin / user token and pagination with limit 
router.get("/", passport.authenticate("jwt", { session: false }),
async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "user" || req.user.role =="vendor") {
    var limitValue = req.query.limit;
    var page = req.query.page;
    var name = req.query.name;
    try {
      if (name) {
      const data = await model.find({ name: { $regex: name, $options: 'i'  } }
      ).limit(limitValue);
      res.send(data);
    } else {
      var data = await model.find()
         .limit(limitValue).skip((page - 1) * limitValue);
      res.status(200).send(data);
   }
    } catch (err) {
      res.send(err);
    }
  }else{
    res.send(err)
  }
})

// guest userS
router.get("/guest", async (req, res) => {
  try {
    const data = await model.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

//vendor's each product
router.get(
  "/:vendor_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("vendor")
    if (req.user.role == "vendor") {
      try {
        const data = await model.find({ vendor_id: req.params.vendor_id });
        res.send(data);
      } catch (err) {
        res.send(err);
      }
    }
  }
);

router.put(
  "/:_id",
  updateProduct,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== "vendor") {
      res.status(403);
      return res.json({ message: "Access only vendor" });
    }
    res.send("Updated");
  }
);

router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== "vendor") {
      res.status(403);
      return res.json({ message: "Access only vendor" });
    }
    try {
      const data = await model.findOneAndDelete({ _id: req.params._id });
      res.send("deteled");
    } catch (err) {
      res.send(err);
    }
  }
);

module.exports = router;

// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     if (req.user.role == "admin" || req.user.role == "user") {
//       try {
//         const data = await model.find();
//         res.send(data);
//       } catch (err) {
//         res.send(err);
//       }
//     } else {
//       res.status(403);
//       return res.json({ message: "Access only authenticated user" });
//     }
//   }
// );