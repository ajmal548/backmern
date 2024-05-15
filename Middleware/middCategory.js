const express = require("express");
const model = require("../schema/categorySchema");
const createCategory = async (req, res) => {
  try {
    const newCategory = new model({
      name:req.body.name,
      picture:req.body.picture,
      status:req.body.status
    });
    const data = await newCategory.save();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    await model.findOneAndUpdate(
      { _id: req.params._id },
      {  name:req.body.name,
        picture:req.body.picture,
        status:req.body.status  }
    );
    next();
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
    createCategory,updateCategory
};

