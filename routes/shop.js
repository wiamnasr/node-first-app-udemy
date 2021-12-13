const path = require("path");

const express = require("express");

// Importing root directory (what I start with when creating this path)
const rootDir = require("../util/path");

// Importing adminData
const adminData = require("./admin");

const router = express.Router();

// the use method can work too but we only want to handle get requests here
router.get("/", (req, res, next) => {
  // taking the products out of adminData to be able to render dynamic content
  const products = adminData.products;

  /*
    res.render will use the default templating engine that we defined to return that template
    injecting the products into our template so we can use it in our template file and somehow output it there
    To accomplish that, we pass a second argument to the render method
    The render method allows us to pass in data that should be added into our view
    Passing prods to avoid name confusion (products) as a JS object, where we map it to a key name, which we then can use in the template to refer to the data we're passing in
    This will be passed into the template where we can now access prods
    We can pass as many fields as we want
  */
  res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });

  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
