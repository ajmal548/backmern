const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  review: String,
  picture: String,
  Video: String,
  rating: {
    type: String,
    enum: ["hate_it", "Didnt_like", "Was_ok", "Liked", "Love_it"],
    default:"Love_it"
  },
});
const reviewModel = mongoose.model("Review", reviewSchema, "review");
module.exports = reviewModel;
