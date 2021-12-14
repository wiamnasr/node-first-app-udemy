// const products = [];

// Switching to saving Product to a file through the fs (file system) module
// In that file, we want to have all products, the old ones, as well as the new products
const fs = require("fs");
const path = require("path");

//   The path
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

// Helper function
const getProductsFromFile = (cb) => {
  //   to be able to fetch the data, we need to read the file at the path and get either an error or file content that will hold the data we want to use
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  // receives a title for our product, which we then control from the controller
  constructor(id, title, imageUrl, description, price) {
    /*
        creating a property in a class (variable in a class) with the this keyword, equal to the title we are receiving as an argument
        This allows us to then create an object based on this class, where we can pass the title to the constructor, which we can call with "new"
        Then this will get stored in the created object
    */
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  // We want to be able to store our product into an array of products, and fetch it
  save() {
    /*
      here we don't forward any callbacks as we have our own logic
      we do retrieve our products (returning empty array or parse the content)
      instead we create an anonymous function were we know we will get our products
    */
    getProductsFromFile((products) => {
      /*
        checking if the id already exists, if the id was null, this will fail and automatically make it to the next line, which we want
        But if we do have an id, save should not create a new id and a new product, it should simply update the existing one
        But we'll still have to get all the products, thats why we place it inside the getProductsFromFile function
      */
      if (this.id) {
        // finding the existing product in order to update it
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        // Adding an id property to the entire object we are working on
        // Unique id can be generated through an external package, but for now will use Math.random()
        this.id = Math.random().toString();

        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });

    // to store a new product in there, first we need to get the existing products
    // for that, we'll first of all read that file
    // important to use an arrow function here, otherwise this will lose its context and will not refer to the class anymore
    // fs.readFile(p, (err, fileContent) => {});
  }

  /*
    we want to be able to retrieve all products, from that array, through my Product model
    the fetchAll method will be like a utility function
    Not called on a single instance of the product as it should fetch all products
    Therefore we add the static keyword, that JS offers
    static makes sure I can call the method on the class itself and not on an instantiated object
  */
  //  accepting a callback argument in fetchAll that allows us to pass a function into fetchAll(), that will get executed once the async function fetchAll() is done
  // This way, the thing calling fetchAll can pass a function it is then aware of being called, which holds the data we want to return
  //   moved contents to helper function
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  // New method where we expect to get an id as an arg and also a callback which will be executed once we are done finding the product here
  static findById(id, cb) {
    getProductsFromFile((products) => {
      // filtering out that one product with the id
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
