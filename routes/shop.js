const path = require("path");

const express = require("express");

// Importing root directory (what I start with when creating this path)
const rootDir = require("../util/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
