const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  // Fetching all products with the defined static method on the Product class
  // in fetchAll, we pass in function, where we know we'll eventually get our products
  Product.fetchAll((products) => {
    // Here, we simply create our own callback process, and we render inside this function
    // The callback in Product.js will refer to this anonymous function we are passing into fetchAll

    /*
    res.render will use the default template-ing engine that we defined to return that template
    injecting the products into our template so we can use it in our template file and somehow output it there
    To accomplish that, we pass a second argument to the render method
    The render method allows us to pass in data that should be added into our view
    Passing prods to avoid name confusion (products) as a JS object, where we map it to a key name, which we then can use in the template to refer to the data we're passing in
    This will be passed into the template where we can now access prods
    We can pass as many fields as we want
  */
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });

  // taking the products out of adminData to be able to render dynamic content
  //   const products = adminData.products;

  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
};

// getting single product data
exports.getProduct = (req, res, next) => {
  // Express.js automatically gives us that param object on our request
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

// middleware function
exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCart = (req, res, next) => {
  // we'll retrieve product id from incoming request
  // then fetch that product in our database (our file)
  // then add it to our cart

  const prodId = req.body.productId;
  console.log(prodId);
  res.redirect("/cart");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
