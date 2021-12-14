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

/*
    The colon ":" signals to express that it should not look for a route, but instead this part (productId) can be anything
    Express will simply route or load this route for this path
    We are then able to extract that information through that name (productId in this case)
    important to note the order, for instance if we had a "router.get("/products/delete")" for instance, if we place it after this one, we'll never reach that route
    This is because express.js would've already fired this route "/products/:productId". "/delete" will be treated as a dynamic segment such a case
    In short, if we had a dynamic segment, and a specific route, the specific route has to go first
*/
router.get("/products/:productId");

router.get("/cart", shopController.getCart);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
