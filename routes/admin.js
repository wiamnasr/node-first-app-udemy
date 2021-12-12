const path = require("path");

const express = require("express");

// Importing root directory (what I start with when creating this path)
const rootDir = require("../util/path");

// router creation
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
