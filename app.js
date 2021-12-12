const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("I will always run");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In add-product middleware!");
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

app.use('/product', (req, res, next) => {
    res.redirect('/');
    console.log(req.body);

});

app.use("/", (req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
