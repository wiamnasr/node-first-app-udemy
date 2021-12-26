const db = require("../util/database");

const Cart = require("./cart");

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

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  // Adding a delete method
  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
