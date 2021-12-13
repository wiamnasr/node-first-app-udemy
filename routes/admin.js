const path = require("path");

const express = require("express");

// importing our controller
const productsController = require("../controllers/products");

// Importing root directory (what I start with when creating this path)
// const rootDir = require("../util/path");

// router creation
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productsController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", productsController.postAddProduct);

// exports.routes = router;
// exports.products = products;

module.exports = router;
