const express = require("express");
const model = require("../schema/orderSchema");
const createOrder = async (req, res) => {
  try {
    const newOrder = new model({
        user_id:req.body.user_id,
        payments_id:req.body.payments_id,
        product_id:req.body.product_id,
        total_price:req.body.total_price,
        status:req.body.status,
        review_id:req.body.review_id,
    });
    const data = await newOrder.save();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
const updateOrder = async (req, res, next) => {
  try {
    await model.findOneAndUpdate(
      { _id: req.params._id },
      {  user_id:req.body.user_id,
        payments_id:req.body.payments_id,
        product_id:req.body.product_id,
        total_price:req.body.total_price,
        status:req.body.status,
        review_id:req.body.review_id, }
    );
    next();
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
    createOrder,updateOrder
};

