const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  ph: Number,
  address:{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  role: {
    type: String,
    enum: ["admin","vendor","user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const userModel = mongoose.model("User", userSchema, "user");
module.exports = userModel;
