const express = require("express");
const model = require("../schema/reviewschema");
const createReview= async (req, res) => {
  try {
    const newReview = new model({
        review: req.body.review,
        picture: req.body.picture ,
        Video: req.body.Video ,
        rating: req.body.rating,
    });
    const data = await newReview.save();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
const updateReview = async (req, res, next) => {
  try {
    await model.findOneAndUpdate(
      { _id: req.params._id },
      {   review: req.body.review,
        picture: req.body.picture ,
        Video: req.body.Video ,
        rating: req.body.rating,}
    );
    next();
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  createReview,updateReview
};

