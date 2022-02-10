const Sequelize = require("sequelize");

require("dotenv").config();

// the sequelize constructor function needs some options, db name, username and password
// an optional fourth argument can be added, an options object, in that object, dialect infers that we are connecting to a mysql database here. the host uses localhost by default, but we are explicitly defining it here
const sequelize = new Sequelize(
  "node-complete",
  `${process.env.USERNAME}`,
  `${process.env.PASSWORD}`,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

// exporting the data connection pool managed by sequelize, giving us a lot of useful features
module.exports = sequelize;
