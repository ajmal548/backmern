const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../schema/UserSchema");
const { body, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("ph")
      .notEmpty()
      .withMessage("Phone number is required")
      .isNumeric()
      .withMessage("Phone number must be numeric")
      .isLength({ min: 10 })
      .withMessage("Phone number must be 10 digits"),
  ],
  passport.authenticate("usersignup", { session: false }),
  function (req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      return res.json({ errors: errors.array() });
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email format
    // Check the email in the correct format
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    console.log("signup");
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      return res.json({ errors: errors.array() });
    }

    passport.authenticate("userlogin", async (err, user, info) => {
      try {
        if (err) {
          return next(error);
        }
        if (!user) {
          res.status(401);
          res.end(info.message);
          console.log("error");
          return;
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = {
            _id: user._id,
            email: user.email,
            role:user.role
          };
          console.log("login success");
          const token = jwt.sign({ admin: body }, "TOP_SECRET", {
            expiresIn: "1 day",
          });

          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
);

// router.get(
//   "/admin",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {
//     if (req.user.role !== "admin") {
//       res.status(403);
//       return res.json({ message: "Access only admin" });
//     }
//     res.json({
//       message: "Welcome, you are the admin",
//       user: req.user,
//     });
//   }
// );

// router.get(
//   "/vendor",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {
//     if (req.user.role !== "vendor") {
//       res.status(403);
//       return res.json({ message: "you'r not Vendor user" });
//     }
//     res.json({
//       message: "Welcome, you are the vendor",
//       user: req.user,
//     });
//   }
// );

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    // if (req.user.role !== "user") {
    //   res.status(403);
    //   return res.json({ message: "Access Forbidden" });
    // }
    res.json({
      message: "Welcome, you are a user",
      user: req.user,
    });
  }
);

router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { name, email, ph } = req.body;
    try {
      // Check if the admin exists
      const admin = await User.findById(id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      } else {
        admin.name = name || admin.name;
        admin.email = email || admin.email;
        admin.ph = ph || admin.ph;
        await admin.save();

        res.json({ message: "Admin data updated successfully", admin });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    try {
      // Check if the admin making the request matches the admin to be deleted
      if (req.user._id.toString() !== id) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this admin" });
      }

      // Delete admin
      const deletedAdmin = await User.findByIdAndDelete(id);
      if (!deletedAdmin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.json({ message: "Admin deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
