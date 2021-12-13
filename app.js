const path = require("path");

const express = require("express");

// importing the body parser
const bodyParser = require("body-parser");

const app = express();

/*
  ejs view engine, like pug auto registers itself with Express
  Has a nice mixture of the extended functionalities of pug (JS that we can use in our templates) & still it uses normal html like handlebars
  - rjs does not support layouts, but we will find a solution to have some kind of reusability of certain building blocks
*/
// the ejs view engine way
app.set("view engine", "ejs");
app.set("views", "views");

// Importing Admin Routes
const adminRoutes = require("./routes/admin");

// Importing shop routes
const shopRoutes = require("./routes/shop");

/*
  Using pug template-ing engine, Setting a global configuration value
  app.set() allows us to set any values globally on our express application
  These can be read from the app object with app.get (a way of sharing data across our application, but not something we are interested in doing at the moment here)
  What we can do, is use a couple of reserved key-names (configuration items that we can set), that do lead to express.js behaving differently
  Interesting for us from those items is view engine and the views key
  View engine allows us to tell express for any dynamic template we are trying to render (there will be a special function for doing that), use this engine we are registering here
  views, allows us to tell express where to find these dynamic views

  - pug template-ing engine ships with built in express support and auto-registers itself with express (this is not the case with all engines)
  - We can set an additional setting (the views) to tell express where to find our views, however the default setting here for views (express app.set() documentation) is process.cwd() + '/views' (basically our main directory then the views folder)
  - Putting it here just in case the folder name was not views as the default and we had to set some configuration to tell express where to find our views
*/
// app.set("view engine", "pug");
// Even though its not needed here, but we are including (views is the default
// app.set("views", "views");

// Body parser middleware
// extended is a config that must be added. It telling if it should be able to parse non default features (added to comply with what we should use here)
app.use(bodyParser.urlencoded({ extended: false }));

// Serving files statically
// static method is a built in middleware that serves static files
// A path to the folder which we want to serve statically is passed in (A folder that we want to grant read access to)
app.use(express.static(path.join(__dirname, "public")));

// admin Routes with /admin filter
app.use("/admin", adminRoutes);

// store Routes
app.use(shopRoutes);

// Adding a 404 Error Page (catch-all)
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/" });
});

app.listen(3000);
