const path = require("path");

const express = require("express");

// shop products controller
const shopController = require("../controllers/shop");

// Importing root directory (what I start with when creating this path)
// const rootDir = require("../util/path");

// Importing adminData
// const adminData = require("./admin");

const router = express.Router();

// the use method can work too but we only want to handle get requests here
router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/cart", shopController.getCart);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
