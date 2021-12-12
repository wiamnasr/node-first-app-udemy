const path = require("path");

const express = require("express");

// Importing Admin Routes
const adminRoutes = require("./routes/admin");

// Importing shop routes
const shopRoutes = require("./routes/shop");

// importing the body parser
const bodyParser = require("body-parser");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serving files statically
// static method is a built in middleware that serves static files
// A path to the folder which we want to serve statically is passed in (A folder that we want to grant read access to)
app.use(express.static(path.join(__dirname, "public")));

// admin Routes with /admin filter
app.use("/admin", adminRoutes);

// store Routes
app.use(shopRoutes);

// Adding a 404 Error Page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);

// module.exports = path.dirname(require.main.filename);
