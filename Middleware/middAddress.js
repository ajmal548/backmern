const express = require("express");
const model = require("../schema/AddressSchema");
const createAddress = async (req, res) => {
  try {
    const newAddress = new model({
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      street: req.body.street,
      postal_code: req.body.postal_code,
      status:req.body.status
    });
    const data = await newAddress.save();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
const updateAddress = async (req, res, next) => {
  try {
    await model.findOneAndUpdate(
      { _id: req.params._id },
      {  country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        street: req.body.street,
        postal_code: req.body.postal_code ,
        status:req.body.status }
    );
    next();
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  createAddress,updateAddress
};

