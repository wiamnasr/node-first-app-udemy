const path = require("path");

const express = require("express");

// Importing root directory (what I start with when creating this path)
const rootDir = require("../util/path");

// router creation
const router = express.Router();

//
const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  // Later on we want to add more fields here, and therefore will create a new object (makes it clearer whats happening)
  // otherwise I could've pushed the whole req.body as it has the same structure
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
