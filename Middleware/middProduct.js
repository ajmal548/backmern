const express = require("express");
const model = require("../schema/productSchema");

const createProduct = async (req, res) => {
  try {
    const body = req.body;
    const newProduct = new model({
      name: body.name,
      picture: body.picture,
      brand: body.brand,
      description: body.description,
      price: body.price,
      color: body.color,
      warranty_info: body.warranty_info,
      quantity:req.body.quantity,
      unit: body.unit,
      pack_of_quantity: body.pack_of_quantity,
      boosting: body.boosting,
      vendor_id: body.vendor_id,
      category_id: body.category_id,
      review_id: body.review_id,
      stock: body.stock,
      status: body.status,
    });
    const data = await newProduct.save();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const body = req.body;
    await model.findOneAndUpdate(
      { _id: req.params._id },
      {
        name: body.name,
        picture: body.picture,
        brand: body.brand,
        description: body.description,
        price: body.price,
        color: body.color,
        warranty_info: body.warranty_info,
        quantity:req.body.quantity,
        unit: body.unit,
        pack_of_quantity: body.pack_of_quantity,
        boosting: body.boosting,
        vendor_id: body.vendor_id,
        category_id: body.category_id,
        review_id: body.review_id,
        stock: body.stock,
        status: body.status,
      }
    );
    next();
  } catch (err) {
    res.send(err);
  }
};
module.exports = {
  createProduct,
  updateProduct,
};
