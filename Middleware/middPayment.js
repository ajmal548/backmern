const express = require("express");
const model = require("../schema/paymentSchema");
const createPayment = async (req, res) => {
  try {
    const newpayment = new model({
        methode :req.body.methode,
        methode_number:req.body.methode_number,
        transaction_ID:req.body.transaction_ID,
        status:req.body.status
    });
    const data = await newpayment.save();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
const updatePayment = async (req, res, next) => {
  try {
    await model.findOneAndUpdate(
      { _id: req.params._id },
      {  methode :req.body.methode,
        methode_number:req.body.methode_number,
        transaction_ID:req.body.transaction_ID,
        status:req.body.status}
    );
    next();
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  createPayment,updatePayment
};

