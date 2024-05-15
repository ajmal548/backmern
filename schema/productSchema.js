const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  vendor_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  name:String,
  picture:String,
  brand:String,
  description:String,
  price:Number,
  color:String,
  warranty_info:String,
  quantity:Number,
  unit:String,
  pack_of_quantity:Number,
  boosting:String,
  stock:{
    type:String,
    enum: ['stock',"outofstock"] ,
    default: "stock"
  },
  status:{
    type:String,
    enum:['active', 'inactive'],
    default: 'active'
  },
  review_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
});

const productModel = mongoose.model("Product", productSchema, "product");
module.exports = productModel;
