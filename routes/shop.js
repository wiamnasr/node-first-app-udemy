const path = require("path");

const express = require("express");

// products controller
const productsController = require("../controllers/products");

// Importing root directory (what I start with when creating this path)
// const rootDir = require("../util/path");

// Importing adminData
// const adminData = require("./admin");

const router = express.Router();

// the use method can work too but we only want to handle get requests here
router.get("/", productsController.getProducts);

module.exports = router;
