const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
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

  /*
    Fetching the product before we pre-populate the form with the product data
    In edit mode, after not being redirected, we want to get our product info
    for that we need the product model, which we already have, as well as the product id
    product id can be retrieved from the incoming request (if we check the routes, we have productId dynamic segment, by this name, we can extract the product id)
  */
  const prodId = req.params.productId;

  /*
    Now we can use our product model, and find this product by id
    then we have a callback where we receive the product which was retrieved
    A check will be added to see if we have a product, and re-direct the user if not
    Assuming we get a product, we want to render the page below
  */
  Product.findById(prodId, (product) => {
    if (!product) {
      // Not the best user experience, usually we want to show an error instead
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      // Now we only enter edit mode if its set
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  // we want to construct a new product & replace the existing one with this product
  // This means work on the product model has to be done
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
