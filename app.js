const path = require("path");

const express = require("express");

// importing the body parser
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

// importing pool
const sequelize = require("./util/database");

// Importing the Product and User models so I can relate them

const Product = require("./models/product");

const User = require("./models/user");

const app = express();

// the ejs view engine way
app.set("view engine", "ejs");
app.set("views", "views");

// Importing Admin Routes
const adminRoutes = require("./routes/admin");

// Importing shop routes
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// admin Routes with /admin filter
app.use("/admin", adminRoutes);

// store Routes
app.use(shopRoutes);

// Adding a 404 Error Page (catch-all)
app.use(errorController.get404);

// the sync method has a look at all the models defined and then creates appropriate tables and relations (if present) for them
sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    // starting the server if we get into this stage
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
