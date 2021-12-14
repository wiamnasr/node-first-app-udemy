const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // Creating a new object based on the Product class blueprint
  // This takes the title we have on our input which is submitted
  const product = new Product(title, imageUrl, description, price);

  // Saving the new Product
  product.save();

  // Later on we want to add more fields here, and therefore will create a new object (makes it clearer whats happening)
  // otherwise I could've pushed the whole req.body as it has the same structure
  // products.push({ title: req.body.title });

  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
