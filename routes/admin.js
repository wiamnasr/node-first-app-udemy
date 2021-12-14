const path = require("path");

const express = require("express");

// importing our controller
const adminController = require("../controllers/admin");

// Importing root directory (what I start with when creating this path)
// const rootDir = require("../util/path");

// router creation
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

// this post route will not receive any dynamic segment, because its a post request, so data can be enclosed with the request we're sending
router.post("/edit-product", adminController.postEditProduct);

// exports.routes = router;
// exports.products = products;

module.exports = router;
