const products = [];

module.exports = class Product {
  // receives a title for our product, which we then control from the controller
  constructor(t) {
    /*
        creating a property in a class (variable in a class) with the this keyword, equal to the title we are receiving as an argument
        This allows us to then create an object based on this class, where we can pass the title to the constructor, which we can call with "new"
        Then this will get stored in the created object
    */
    this.title = t;
  }

  // We want to be able to store our product into an array of products, and fetch it
  save() {
    products.push(this);
  }

  /*
    we want to be able to retrieve all products, from that array, through my Product model
    the fetchAll method will be like a utility function
    Not called on a single instance of the product as it should fetch all products
    Therefore we add the static keyword, that JS offers
    static makes sure I can call the method on the class itself and not on an instantiated object
  */
  static fetchAll() {
    return products;
  }
};
