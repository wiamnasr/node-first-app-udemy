//
const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  // Later on we want to add more fields here, and therefore will create a new object (makes it clearer whats happening)
  // otherwise I could've pushed the whole req.body as it has the same structure
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // taking the products out of adminData to be able to render dynamic content
  //   const products = adminData.products;

  /*
    res.render will use the default templating engine that we defined to return that template
    injecting the products into our template so we can use it in our template file and somehow output it there
    To accomplish that, we pass a second argument to the render method
    The render method allows us to pass in data that should be added into our view
    Passing prods to avoid name confusion (products) as a JS object, where we map it to a key name, which we then can use in the template to refer to the data we're passing in
    This will be passed into the template where we can now access prods
    We can pass as many fields as we want
  */
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });

  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
};
