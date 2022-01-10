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

// Adding a middleware to store the user in my request to be used anywhere in my app conveniently
app.use((req, res, next) => {
  // This code only runs for incoming requests, which on the other hand can only reach this if we successfully started our server with app.listen(), that in turn is only true if we are done with the initialization code, so we are guaranteed to find a user here
  User.findByPk(1)
    .then((user) => {
      // remember, the user here is a sequelize object with the values stored in the database, with all the utility methods that sequelize added, like destroy()
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// admin Routes with /admin filter
app.use("/admin", adminRoutes);

// store Routes
app.use(shopRoutes);

// Adding a 404 Error Page (catch-all)
app.use(errorController.get404);

// Relating the Product and User
// We are talking about a user creating a product and not purchasing at this point
// second argument is optional and is passed to configure, defining how the relationship will be managed
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

// Defining the inverse (optional, not needed here) => one user can add more than one product to the shop
User.hasMany(Product);

// the sync method has a look at all the models defined and then creates appropriate tables and relations (if present) for them
sequelize
  // To ensure that we are over-writing with new information we can set force to true
  // { force: true }

  .sync()
  .then((result) => {
    // once the table has been created, I also want to create my user
    // As there is no authentication currently, checking if there is a User, if I find 1 user, I will not create a new user else I will
    User.findByPk(1);

    // console.log(result);
  })
  .then((user) => {
    // if I dont have a user, I want to create a new one by calling User.create()
    // User.create() passing a js object where I set the name to 'Max' and the email to a dummy email
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
