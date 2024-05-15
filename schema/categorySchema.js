const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name:String,
  picture:String,
  status:{
    type:String,
    enum:['active', 'inactive'],
    default: 'active'
  },
});

const categoryModel = mongoose.model("Category", categorySchema, "category");
module.exports = categoryModel;
