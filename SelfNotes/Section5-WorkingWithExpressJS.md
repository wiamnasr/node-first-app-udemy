<style>

    html {
        background:rgba(100,120,0,0.4);
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
