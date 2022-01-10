// Defining a sequelize model with a user that has an id (the id should have the same function as it has for the product model), also defining a name and an email for the user

const Sequelize = require("sequelize");

// Importing my own sequelize object that holds the connections from the util folder, in the database file
const sequelize = require("../util/database");

// defining a user and storing the user in a const using sequelize.define()
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;
