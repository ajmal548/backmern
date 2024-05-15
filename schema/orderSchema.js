const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  payments_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  product_id:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  total_price:Number,
  status:{
    type:String,
    enum:['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending'
  },
  review_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
});

const orderModel = mongoose.model("Order", orderSchema, "order");
module.exports = orderModel;
