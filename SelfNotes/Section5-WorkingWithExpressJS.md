<style>

    html {
        background:rgba(100,120,0,0.4);
        
    }

    body {
        line-height: 3rem;
    }



    .modules {
        width:100%;
        color: white;
        background:rgba(200,0,100,0.4);
        font-size:50px;
        text-align: center;
        height: 150px;
    }

    .headings3 {
        color: white;
        width:40%;        
        background:rgba(200,0,100,0.4);
        font-size:30px;
        text-align: center;
        margin-left: 30%;
        height: auto;
    }

    a {
        color: white;
    }

    .sectionHeading {
        color: white;
        width:100%;        
        background:rgba(200,0,100,0.4);
        font-size:30px;
        text-align: center;
        height: auto;
       

    }

    .paraS {
        color: white;
        width:80%;        
        background:rgba(100,120,0,0.4);
        font-size:15px;
        /* text-align: center; */
        margin-left: 5%;
        height: auto;
        padding: 1rem 3rem 0 5rem;
        line-height: 3rem;


    }

    .keyword {
        font-size: 20px;
        border-style: solid;
        color: white;
        background:rgba(100,120,0,0.4);
    }

    .toc {
        background-color: rgba(100, 200, 0, 0.4)

    }

    .tab {
        margin-left: 60px;
    }

    
</style>

# [NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)](https://www.udemy.com/course/nodejs-the-complete-guide)

> ## Instructor: **Maximilian Schwarzmüller**

> ## Self Notes by: **Wiam Nasr**

<br></br>
<br></br>

<section class ="toc">
| Table of Contents |

## Section 5

- [Adding Middleware](#addingMiddleware)

- [Handling Different Routes](#handlingDifferentRoutes)

- [Parsing Incoming Requests](#parsingIncomingRequests)

</section>

<hr />

<br></br>
<br></br>

<h2 class="modules"> Section 5: Working with Express.js  </h2>

<br></br>
<br></br>

## <h2 class="sectionHeading" > <a id="addingMiddleware"> [Adding Middleware](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11566256#overview)</a> </h2>

<br></br>

<p class="paraS"> <span class="tab"/>Express.js is all about Middleware. In the end Middleware means that an incoming request is automatically funnelled through a bunch of functions by express.js.<br></br><span class="tab"/>Instead of just having one request handler, we get the possibility of hooking in multiple functions, which the request will go through until you send a response<br></br><span class="tab"/>This allows us to split our code into multiple blocks or pieces instead of having one huge function tha does everything<br></br><span class="tab"/>This is the plug-able nature of express.js, where we can easily add third party packages, that happen to give us these middleware functions that we can plug into express and add certain functionalities  </p>
<br></br>

> ### We can use the Middleware, by going to our code, after the app object creation with Express, but before we pass the app object to createServer.

<br></br>

> ### We use the app and call a method which is defined by the express framework <span class="keyword">**"app.use()"**</span>

<br></br>

```javascript
const http = require("http");

// Using Express instead of the routes.js file created for Node routing in section 3
const express = require("express");

app.use();

// Creating an Express application and storing it in a const named app:
const app = express();

// The app is also a valid request handler, so we can pass it to createServer:
// But at this point app only sets up a certain way of handling incoming requests that is a key characteristic of express.js
const server = http.createServer(app);

server.listen(3000);
```

<br></br>

<p class="paraS"> <span class="tab"/> <span class="keyword">"use"</span> allows us to add a new middleware function. It accepts an array of request handlers (has other use cases too). One easy way of using it, is through simply passing a function through it, that will be executed for every incoming request<br></br><span class="tab"/>This function will receive three arguments. The "request" and the "response" objects and a third, the "next" argument. "req" and "res" are basically what we know so far, but with some extra features. "next", is actually a function that will be passed to the app.use((req,res,next)=>{...}) function by express.js<br></br><span class="tab"/> This can be confusing, as we are passing a function as an argument to the "use" method and this function we are passing, is receiving yet another function here on the "next" argument. And this "next" argument (the function we are receiving as a third argument of the app.use function), has to be executed to allow the request to travel on to the next middleware!</p>
<br></br>

```javascript
const http = require("http");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware!");

  // allows the request to continue to the next middleware in line!
  next();
});

app.use((req, res, next) => {
  console.log("In another middleware!");
});

const server = http.createServer(app);

server.listen(3000);
```

<br></br>

<p class="paraS"> <span class="tab"/>Important to note that Express.js does not send a default response, instead we have to set the response. using the response object, named "res" here, it gets easier thanks to express.js to send a response. We can set a header, write, ... just like before, but there is a new utility function we can use, called <span class="keyword">"send"</span> which allows us to send a response. It also allows us to attach a body of type any. E.g. html (in network tab, under header, content type is automatically set to text-html), in this case we do not call next(); here and we do the alternative, which is sending a response with send </p>
<br></br>

> ### We either use next() to reach the next middleware, or we send a response to not do anything else

<br></br>

```javascript
const http = require("http");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware!");
  next();
  //   Note that if we send a response here as we do below, instead of next(), we will never reach the next middleware
});

app.use((req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from Express!</h1>");
  //   We don't call next() here, because we are sending a response
});

const server = http.createServer(app);

server.listen(3000);
```

<br></br>

> ## In summary, we travel from middleware to middleware, from top to bottom, by calling next

<br></br>

<p class="paraS"> <span class="tab"/><span class="keyword">"app.listen()"</span>  does the two things we did before, it calls http.createServer, and passes itself (the app object) into createServer and in the end, it makes sure that listen gets called on that server object <br></br> This can be found in the Express documentation and looks like the below, although we don't have to worry about it as Express does this for us. Mentioning simply to understand what Express does behind the scenes </p>
<br></br>

```javascript
app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

<br></br>

> ## Now we can remove that http import and use app.listen from Express.js like below

<br></br>

```javascript
const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware!");
  next();
});

app.use((req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
```

<br></br>
<br></br>

## <h2 class="sectionHeading" > <a id="handlingDifferentRoutes"> [Handling Different Routes](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11566276#overview)</a> </h2>

<br></br>

#### Important Resources:

> [app.use() documentation](http://expressjs.com/en/4x/api.html#app.use)

<br></br>

<p class="paraS"> <span class="tab"/>We mentioned before that the use function has multiple versions (4 overloads)<br></br><span class="tab"/><span class="tab"/><span class="keyword">app.use([path,] callback [, callback...])</span><br></br><span class="tab"/>The above is how we can use app.use()</p>
<br></br>

<ul>
    <li>We got an optional first argument, the <span class="keyword">"path"</span>. It allows us to filter out certain requests, however this works a little bit differently than how we did it in section 3 in Node.js with the if statements (will come back to that in more details)</li>
    <li>The second argument that the app.use() takes is a callback. Basically a function that should be executed</li>
    <li>we can have more than one of that callback, we can have as many as we want. Also possible to have multiple path filters here</li>
    <li><span class="keyword">app.use('/', ...)</span><span class="tab"/>Defining the path as nothing with a forward slash "/" such as here (default path). So visiting "localhost:3000" will lead me to that path </li>
    <li>Note that if I input the url as <span class="keyword">localhost:3000/add-product</span> or any other thing after the forward slash, we still see <span class="keyword">Hello from Express!</span> in our example. because this middleware (app.use('/', (req,res,next)=> {...})) gets executed for both "/" and "add-product". Because, this does not mean that the full path (the part after the domain) has to be a '/', but it has to start with that '/'</li>
    <li>Of course, every route starts with just a '/' and then we have different other criteria</li>
    <li>What we can do is duplicate the "app.use('/', (req,res,next){...})" and add it before this middleware, adding the "add-product" after the '/' as such <span class="keyword">app.use('/add-product', (req, res, next) => {...}</span></li><li>As for why it should be added before the middleware and not after it, is because if you remember the request goes through the file, from top to bottom, and if we don't call next, its not going into the next middleware. Here we're not adding next, so the middleware <span class="keyword">app.use('/add-product', (req, res, next) => {...}</span> will be reached first (because of the top to bottom execution). "add-product" will match this middleware, and since we don't call next, this middleware <span class="keyword">app.use('/', (req,res,next){...})</span> will not be given a chance to handle that request (even though the filter "/" in this middleware would've matched that request too!)</li>
</ul>

<br></br>

```javascript
const express = require("express");

const app = express();

// This is added for demonstration and will show up in the console whether we visit "/add-product" or just "/" or any other thing after the "/"
app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In another middleware!");
  res.send('<h1>The "Add Product" Page</h1>');
});

app.use("/", (req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
```

<br></br>
<br></br>

## <h2 class="sectionHeading" > <a id="parsingIncomingRequests"> [Parsing Incoming Requests](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11566290#overview)</a> </h2>

<br></br>

<p class="paraS"> <span class="tab"/>How can we work with incoming requests and extract data from them? <br></br><span class="tab"/>For that, we want to be able to handle a <span class="keyword">POST</span> request</p>
<br></br>

> ### Lets say on '/add-product' we want to return an html page with a form as below with a button, and an input field. The form will need an action (path/url to which the request will be sent) and a method (POST). This will enable us to send an html back that holds a form. Then we'll need a route, or a middleware that handles requests to '/product' (app.use('/product')) with our function that receives the 3 arguments (req, res, next) that will execute for /product. In there we want to redirect and in the example below, we are logging the incoming data to the console

<br></br>

> ### For re-directing, we can use <span class="keyword">res.redirect('...')</span> inside the "/product" middleware function. "res.redirect()" is another convenient function by Express.js. Much easier than manually setting the status code and setting the location header. In our example below, we are rediercting to '/', so it will automatically redirect me to the slash route

<br></br>

> ### We are also interested in getting the body of our incoming requests (extracting what the user sent us!). Express.js has another convenience feature for us to do just that. If we <span class='keyword'>console.log(req.body)</span> and go to '/product' where we created an input field, upon adding anything in the input field and pressing "Add Product", we are redirected to '/', and in the console, we see undefined

<br></br>

```javascript
const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("I will always run");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In add-product middleware!");
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

app.use("/product", (req, res, next) => {
  res.redirect("/");
  console.log(req.body);
});

app.use("/", (req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
```

<br></br>
