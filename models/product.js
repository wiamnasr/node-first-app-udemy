const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// defining a model that will be managed by sequelize by calling define method on the connection pool to our database
// first argument we define the desired name, second argument we define a js object that contains the attributes/fields that our product should have here
const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
