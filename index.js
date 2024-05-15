var express = require("express");
var app = express();
const passport = require("passport");
var bodyParser = require("body-parser");

//Router
const Users = require("./routes/Users");
const address = require("./routes/address");
const product = require("./routes/product");
const category = require("./routes/categories");
const order = require("./routes/order");
const payment = require("./routes/payment");
const review = require("./routes/review");


var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_Prc");

app.set("views", "index");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./Middleware/userAuth");

app.use("/auth", Users);
app.use("/address", address);
app.use("/product", product);
app.use("/category", category);
app.use("/order", order);
app.use("/payment", payment);
app.use("/review", review);

app.use("/auth", passport.authenticate("jwt", { session: false }), Users);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(4000);
