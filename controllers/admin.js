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

// Here I plan on passing in my product information
exports.getEditProduct = (req, res, next) => {
  /*
      passing in an additional information field (a boolean set to true)
      we can check this with an if condition to see if on clicking the save button, we should add the product and send a request to that route, or try to edit it and sed it to a different route
      Lets say we want to get additional confirmation, by ensuring that people have to pass us a so called query parameter in the url
      A query parameter can be added to any url by adding a "?" question mark, then a key-value pair, separated by an equal sign
      We can have multiple query parameters, separated by ampersands "&"

      checking if editMode is set, by accessing query object (created and managed by express)
      We can try to access the data here, by trying to access the keys we get in our query parameters 

      For the example here, we might check for "edit" key in our query parameters as we are doing below in editMode const
      e.g.: "localhost:3000/admin/edit-product/12345?edit=true&title=new"
    */
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    // Now we only enter edit mode if its set
    editing: editMode,
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
