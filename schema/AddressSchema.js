const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  country: String,
  state: String,
  city: String,
  street: String,
  postal_code: String,
  status:{
    type:String,
    enum:['active', 'inactive'],
    default: 'active'
  },
});

const addressModel = mongoose.model("Address", addressSchema, "user_Address");
module.exports = addressModel;

