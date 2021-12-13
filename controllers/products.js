const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  // Creating a new object based on the Product class blueprint
  // This takes the title we have on our input which is submitted
  const product = new Product(req.body.title);

  // Saving the new Product
  product.save();

  // Later on we want to add more fields here, and therefore will create a new object (makes it clearer whats happening)
  // otherwise I could've pushed the whole req.body as it has the same structure
  // products.push({ title: req.body.title });

  res.redirect("/");
};

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
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });

  // taking the products out of adminData to be able to render dynamic content
  //   const products = adminData.products;

  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
};
