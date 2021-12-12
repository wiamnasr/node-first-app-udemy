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
        text-align: center;
        margin-left: 10%;
        height: auto;


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

    
</style>

# [NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)](https://www.udemy.com/course/nodejs-the-complete-guide)

> ## Instructor: **Maximilian Schwarzmüller**

> ## Self Notes by: **Wiam Nasr**

<br></br>
<br></br>

<section class ="toc">
| Table of Contents |

## Section 3

- [Creating a Node Server & The Node Lifecycle & Event Loop](#creatingNodeServer-and-nodeLifecycle)

- [Understanding Requests & Sending Requests](#understandingRequests-and-sendingRequests)

- [Routing Requests](#routingRequests)

- [Redirecting Requests](#redirectingRequests)

- [Parsing Request Bodies](#parsingReqBod)

- [Understanding Event Driven Code Execution](#eventDrivenCodeExecution)

- [Blocking and Non-Blocking Code](#blockingNonBlockingCode)

</section>

<hr />

<br></br>
<br></br>

<h2 class="modules"> Section 3: Understanding the Basics  </h2>

<br></br>
<br></br>

## <h2 class="sectionHeading" > <a id="creatingNodeServer-and-nodeLifecycle"> [Creating a Node Server](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11561886#overview) & [The Node Lifecycle & Event Loop](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11561888#overview) </a> </h2>

<br></br>

#### Some Core Modules that NodeJS ships with:

- http: helps with launching a server and sending requests

- https: helps with launching an SSL encrypted server

- fs: file system

- path: helps in constructing paths

- os: helps with operating system relevant information

<br></br>

<h3 class="headings3">Creating a Server</h3>

1.  To use the http module, we need to import it

2.  createServer takes in a request listener as an argument (a function that will execute for every incoming request)

    > request listener function receives a request (incoming message) and response object

    > createServer method returns a server, that needs to be stored somewhere

3.  Now I can use the server and do something with it

    > The listen method will result in node js keeping the server running to listen for request

    > It takes a couple of optional arguments, such as the port on which you want to listen

<br></br>

> #### Following the above is enough to create a basic server, that is doing nothing for the moment
>
> <br></br>

## <h3 class="headings3"> Understanding the Event Loop </h3>

### Lets say We executed the above basic server with node app.js

    => This started the script where nodeJS went through the entire file, parsed the code, registered the functions and so on (read the entire code and started executing it)

    => BUT, We never left the program (event loop) this loop process, managed by NodeJS keeps on running as long as there are event listeners registered

    => Our core node application is basically managed by this event loop (all our code)

    => JS uses such an event driven approach for all kinds of stuff, not just for managing that server (e.g later on when we access a database, we also send insert request and we register a function that should be executed once that is done)

    => NodeJS uses this pattern because it executes single threaded JS

    => The entire Node process basically uses one thread on the computer its running on

    => If we create a server with NodeJS it should be able to handle plenty of requests (thousands, if not hundred thousands of incoming requests)

    => Pausing each time to do something with each request received is not that great

    => Hence, the event loop concept is used where in the end it keeps on running and just executes code when a certain event occurs

    => So in general it is always available

    => It is super fast in handling those requests and behind the scenes nodeJS does multi-threading, by leveraging the operating system

> #### Un-registering is done with **process.exit()**, this will end the process (hard exit)

> Typically, we don't want to do this in our code as we do not want to quit the server, if that happened people will not be able to reach your webpage anymore

<br></br>
<br></br>

## <h2 class="sectionHeading" > <a id="understandingRequests-and-sendingRequests"> [Understanding Requests](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11561890#overview) & [Sending Requests](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11561892#overview) </a> </h2>

> #### Important Resources:

> [nodemon](https://www.npmjs.com/package/nodemon)

<br></br>

<h3 class="headings3"> Understanding Requests </h3>

#### The Request Object

> #### The request object is the object NodeJS generated for us with all the data of the incoming request when we visited for example **localhost:3000** (depending on what port you are listening to requests on)

- Taking a look at the request object there are lots of data in it, and not just data, some are functions that we can call

- There are headers (metadata/meta-information) added to requests and responses, in the headers object:

        => There is a host for example that the request was sent to

        => There are some headers attached by the browser (how the response data should be cached, which browser we used for that request, which kind of response we should accept, ...)

- In short there is too much data being returned by the req object, but there are a few important fields we typically need:

  ## **req.url**, **req.method** and **req.headers**

<br></br>

> #### REMEMBER: you always need to stop and relaunch the server if you edited something, else you can use nodemon to keep the server running and monitor any changes for you, restarting the server automatically with every change

<br></br>

<h3 class="headings3"> Sending Requests </h3>

#### For sending requests, we'll use the response object

        -   Will use it to fill it with data we want to send back

##### Calling **res.setHeader()** for instance allows us to set a new header

<br></br>

=> Calling setHeader(), we pass in as the first argument **'Content-Type'** for example, which is a default header which the browser knows and understands and accepts

=> As a second argument for setHeader, we set the value for this header key, for 'Content-Type' we might set the second argument of the setHeader() as **'text/html'**

#### The above will attach a header to our response, where we basically pass some meta-information, saying that the type of the content (which will also be part of the response) is html

> Remember: There is a set of supported headers that the browser understands

<br></br>

#### An important missing link in the above is the html code of course, because so far with **setHeader('Content-Type', 'text/html')** I am saying that we have html code but I'm not sending it

### We send the html code by setting **res.write()**

> ### "write" allows us to write some data to the response. It basically works in chunks (a good way of looking at it is writing multiple lines of response)

    > Example if we write html code like this:

```javascript
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Serverrr!!!!</h1></body>");
  res.write("</html>");
  res.end();
});
```

> By doing the above I am writing an html document in a complex way, it will be written to the response line by line

> once we are done creating the response notice that we passed **res.end()** which tells node that this is the end of our response

> After res.end(), we must not write any code as it will result in an error

> #### The above does look super strange, but later on we'll learn of a much easier way of sending html

<br></br>
<br></br>

## <h2 class="sectionHeading"> <a id="routingRequests"> [Routing Requests](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11561894#overview) </a> </h2>

<br></br>

#### Connecting both request and response, by starting to write a very simple web server that does different things depending on which route we enter

> #### localhost:3000/**DEFINED_ROUTE_HERE**

<br></br>

### Lets say for nothing after the forward slash "/", represented as: **localhost:3000/** the user can enter some data, which we then store in a file on the server once its sent

<br></br>

#### - This can be done by first of all parsing the url, in the below code, its being stored in a new const by accessing **req.url**

<br></br>

#### - If statement is then used to check if url is equal to just **'/'**. Only this will match

<br></br>

#### - If that is the case and there is a match, I want to return a response, which holds some html that gives the user an input form and a button that will send a new request in return (that will not be a get request)

<br></br>

#### - The form has an action which is basically the url, this request that will be generated automatically should be sent to. using **/message** here, and this will automatically target the host its running on (localhost:3000 in our case here)

<br></br>

#### - Then the http method that should be used is defined. Previously we got a get request, which is the default if we enter a url, here we are not entering a url, but instead we want to send a **POST** request

<br></br>

#### - By defining that we want our method to be **POST** in the form method handler, the form will not just send such a request, but also it will look into the form, detect any inputs or related elements (like select that we might have)

<br></br>

#### - If we give that input a name (which we should), it will also automatically put the name (any input data) to the request and make it accessible via the assigned name

<br></br>

**Note that putting a return statement in front of res.end() is not required to return a response! But to rather return from the anonymous function and not continue the rest of the code, because we return prior to it**

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!!!!!!!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
```

### There are a limited set of http words we can use, GET and POST are the two most important ones

<br></br>

## A GET request is automatically sent when you click a link, or enter a url

## A POST request has to be setup by you by creating such a form as the above or through other ways with JS that we will not go through for now

<br></br>
<br></br>

## <h2 class="sectionHeading"> <a id="redirectingRequests"> [Redirecting Requests](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11561896#overview) </a> </h2>

<br></br>

#### - Adding another if statement to check if the url is equal to message (strict equality) and (&&) the other condition is we want to be sure that we are not handling a GET request, but a POST request

<br></br>

#### - In addition to parsing the html, as we did in the previous section when we assigned a const url the value of req.url, lets also parse the method from **req.method** and make sure that method is equal to POST

<br> </br>

#### - Will only enter this if statement code block, if we have a post request to **'/message'**

<br> </br>

#### - In this case, I want to do two things. I want to redirect the user to slash nothing '/', and I want to create a new file and store the message the user entered in it, and this involves a couple of things

<br> </br>

#### - To get started with redirecting and creating that file, we need another package (core module), and that is the **file system** core module

<br> </br>

#### - We import the file system core module by storing the functionality in a constant, named "fs" in this example

<br> </br>

#### - **fs** const will now allow us to work with the file system, here I want to write a new file, executing **fs.writeFileSync('message.txt')** that takes the path to the file, here we are using the file name it in the same folder as app.js

            > using writeFileSync for now, will soon understand the difference between this and writeFile (without Sync)

<br> </br>

#### - Also in the fs.writeFileSync, I want to store what the user sent, which is a little bit more work, but for now will put some 'DUMMY' text in there and lets redirect the user

<br> </br>

#### - Following the **fs.writeFileSync('message.txt', 'DUMMY')**, calling **res.writeHead()** which basically allows us to write some meta information in one go

<br></br>

#### - In the res.writeHead, we set the status to 302, which stands for redirection, as such res.writeHead(302)

#### - As a second argument, we pass in a JS object with some headers we want to set

#### - This can be done in two steps, by setting the statusCode to 302 as such **res.statusCode = 302** and then simply setHeader(), were we set the 'location' (a default header accepted by the browser) and we set that location to just '/' as such **res.setHeader('Location', '/')** and it will automatically use the host we're already running on

#### - At the end we mustn't forget **return res.end()** so we don't execute the code after it

<br> </br>

```javascript
const http = require("http");
const fs = require("fs");
const method = req.method;

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!!!!!!!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
```

<br></br>
<br></br>

## <h2 class="sectionHeading"> <a id="parsingReqBod"> [Parsing Request Bodies](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11561900#overview) </a> </h2>

<br></br>

time to parse the incoming request and get the data that is part of the request, because that data should be whatever the user entered in the input field

How do we get access to the data in the input field?

- We get req.url and req.method, but there is nothing such as req.data

- Instead the incoming data is basically sent as a stream of data, and that is a special construct that JS in general knows, but node.js uses this construct a lot

#### What is such a stream of data though?

- There is a connected concept, buffers, will have a look at both here, streams and buffers
  <br></br>

#### Taking our incoming request as an example (there also are other streams, like when working with files we can also work with streams, but sticking to requests here)

<br></br>

#### - Our stream here is basically an ongoing process

<br></br>

#### - The request is simply read by node in chunks you could say (in multiple parts) and at the end, in some point in time, it is done

<br></br>

#### - Theoretically, we can start working on this, on the individual chunks without having to wait for the full request being read

<br></br>

#### - For the simple request we are working with, this is not really required. We only got one input field data that doesn't take long to be parsed

<br></br>

#### - But consider a file being uploaded, this will take considerably longer, therefore streaming the data could make sense because it could allow you to start writing this to your disk (your hard drive where your node app runs on your server), whilst the data is coming in

<br></br>

#### - This way we don't have to parse the entire file, which is of course taking some time and we have to wait for it to be fully uploaded before we can do anything with it

<br></br>

#### - This is how node handles all requests, because it doesn't know in advance how complex and big they are

<br></br>

> ### So we can start working on the data earlier, but the problem is that with our code, we can't arbitrarily try to work with these chunks

<br></br>

> ### Instead, to organize these incoming chunks, we used a so-called **Buffer**

<br></br>

<h3 class="headings3"> Understanding What's a Buffer </h3>
<br></br>

<p class="paraS"> A buffer is like a bus stop, considering that they are always moving, for customers to be able to work with them, to climb on and leave the bus, they need bus stops where we can track the bus basically. That is what a  <span class="keyword">Buffer</span>  is </p>

<br></br>

<p class="paraS">A buffer is simply a construct which allows us to hold multiple chunks and work with them before they are released. Working with it is pretty abstract but pretty easy to work with </p>

#### To see how that works in practice, when receiving a posted message, before sending a response, and before writing to the file, we want to get out request data

> ### We get our request data by going to our request and registering an event listener
>
> <br></br>

> ### REMEMBER, node uses event listeners heavily, for createServer it implicitly creates one for us, now we create an event listener on our own by using the <span class="keyword">on</span> method

<br></br>

### **req.on()** allows us to listen to certain events, here we want to listen to the data event (the IDE can give you some help as it tells you what events you can listen to for a request)

<br></br>

### Here we want to listen for the data event, which will be fired whenever a new chunk is ready to be read

<br></br>

> ### A second argument is added to the res.on('data', ()=>{}), a function to be executed for every incoming data piece (every data event)
>
> <br></br>

> Similar concept as the above was applied in createServer, where we defined a function that should be executed for every incoming request. Now we are defining a function to be executed for every data-piece
> <br></br>

#### This listener receives a chunk of data. But to be able to interact with the chuck received, first, we create a const, named "body" here, initialized as an empty array

<br></br>

#### In the function (data event) we take our data ("body") and push a new element onto it. Pushing our chunk to the new array

<br></br>

### Node.js will execute the req.on() so often until its done getting all the data out of our request

<br></br>

> #### After the above, we need to register another event listener, that is the <span class="keyword">req.on('end')</span> that will be fired once its done parsing the incoming requests data or the incoming requests in general
>
> <br></br>

#### In req.on('end'), we pass in a second argument, a function in which we can now rely on all the chunks being read in and stored in the body now

<br></br>

#### To interact with these chunks, we now need to buffer them (remember the bus stop concept). We got all these chunks and we now need to do something to be able to work with them (to simply have one place where the bus stops and we can interact with it)

<br></br>

#### For that we create a new const, called parsedBody in the below code. There, we'll use the Buffer object that is made available globally by Node.js

<br></br>

#### On that Buffer object, I can concat(body) my body

<br></br>

> ### This will in the end create a new buffer and add all the chunks from inside my body to it. Now parsedBody, the const we created and passed the Buffer object in is a Buffer!

<br></br>

> ### The bus is now waiting in the bus stop (the buffer is our bus stop). Now we can do something with it (convert it to a string in this case by calling toString() on our parsedBody Buffer) => This only woks because we know the incoming data will be text in this example (the body of the request will be text, if it were a file, we'll have to do something different)

<br></br>

```javascript
const http = require("http");
const fs = require("fs");
const method = req.method;

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
    });

    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!!!!!!!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
```

<br></br>

#### With that we can now store the input in our file, in req.on('end', ...) we create a new const "message", taking the parsedBody and splitting it on the equal sign, then taking the element with index one (the second element in the resulting array, aka the element on the right of the equal sign of the returned "message")

<br></br>

#### With that, we can move writeFileSync into the end function, so that now the writeFileSync will be registered as a to-be-executed action. If we have something that depends on the incoming data, we have to move it into the event listener too, so it is also part of the to-be-executed code, sometime in the future and it doesn't run too early

<br></br>

#### Now in the fs.writeFileSystem('message.txt', ) as a second argument, we can write message to write message to the message.txt file

```javascript
const http = require("http");
const fs = require("fs");
const method = req.method;

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });

    res.statusCode = 302;
    res.setHeader("location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!!!!!!!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
```

<br></br>
<br></br>

## <h2 class="sectionHeading"> <a id="eventDrivenCodeExecution"> [Understanding Event Driven Code Execution](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/12310980#overview) </a> </h2>

<br></br>

> #### One crucial thing that is a common struggle point, is the order of execution of the code

<br></br>

#### For instance, in the above code, the order of execution of the code is not necessary in the order in which it's written

> ### For example, **fs.writeFileSys('message.txt', message)** will actually execute after the **res.statusCode = 302** and **res.setHeader(...)** as well as the **return res.end()** code. It will execute after we already sent the response

### This has two important implications:

### - 1. Sending the response, does not mean that our event listeners are dead, they will still execute even if the response is already gone

<br></br>

### - 2. It also means that if we do something in the event listener that should influence in the response, this is the wrong way of setting it up

<br></br>

## To solve this, we should then move the response code into the event listener, if we had such a dependency!

<br></br>

> ## This also means that its super important to understand that with req.on or code like http.createServer, these are some examples where Node.js uses a pattern where we pass a function to a function and Node.js will execute these passed in functions at a later point of time (**Asynchronously**)

<br></br>

## Its not always the case that a passed in function is necessarily executed at a later point of time, Node.js uses this pattern heavily.

<br></br>

## In such cases, Node.js won't immediately run that function, instead, what it does when it encounters the **req.on('end',()=>{...})** code line, it will simply add a new event listener internally (manages all the listeners internally). Here its for the end event on the request which will be triggered automatically once Node.js is done parsing the request (Node.js does this for us)

<br></br>

## Node.js will then call that function for us once its done

<br></br>

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!!!!!!!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
```

<br></br>

<p class="paraS">In the end you can think of this as Node.js having some internal registry of events and listeners to these events. A function like the one we have in the example (<span class="keyword">req.on('end',()=>{...}</span>) is such a listener<br></br> When Node JS is done parsing our request, it will go through that registry and see if its done with the requests<br></br> If done with the request, it sends the end event<br></br> To send the end event, it searches for listeners it has for that end event <br></br> It will then find the function in <span class="keyword">req.on('end',()=>{...}</span> and any other functions you might have registered for that, and will now call them!<br></br><span class="keyword">Important to note that Node.js will not pause the other code execution!</span></p>

<br></br> After we moved return res.end() into the res.on function, the flow becomes like this: <ul><li>Node will reach the if statement <span class="keyword">if (url === '/message' && method === 'POST') {...}</span> and if these conditions are met it will go inside of it </li><li>It will then register the two handlers we have <span class="keyword">req.on('data', (chunk) => {...})</span> and <span class="keyword">req.on('end', () => {...})</span> and not immediately execute these functions </li> <li>Instead, the functions are just registered internally in the event emitter registry</li> <li>Then it will jump straight away to the next line were we have <span class="keyword">req.setHeader('Content-Type', 'text/html')</span> </li></ul>
<br></br>

<p class="paraS">Therefore, right now, if we restart our server with the code we have above, we'll see that upon entering something in the input field, Node.js loads the html page with the <span class="keyword">Hello from my Node.js Server!!!!!!!</span> text. We are not even re-directed if we check the status code, we do not get <span class="keyword">300</span> but instead a <span class="keyword">200</span> status code, so Node.js loads that page because it executes the lines after the <span class="keyword">req.on("end", () => {...return res.end()}</span>, because as we mentioned multiple times so far, the <span class="keyword">req.on("end", () => {...}</span> will not be executed right away and the return statement within it will therefore not quit the overarching function, instead, it just registers the <span class="keyword">req.on("end", () => {...}</span> callback and immediately moves on to the next lines. <br></br> Eventually it will execute it, but that would be already too late, which is also why we get the  <span class="keyword">Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client</span> error here <br></br> Its a crucial concept that we can register code functions which run sometime in the future, but not necessary right now. This setup is important, otherwise node will pause until its done parsing the file, and if does that, it will simply slow our server down and its not able to handle other incoming requests until its done, that is not what we want. <br></br>We do not want to block our code execution, instead we always want to be in that "wait for new events loop" (event loop) and only execute code once its due to be executed, never blocking that event loop for too long of a time <br></br> This is why we have this setup as above, which has one implication for this line of code <span class="keyword">fs.writeFileSync('message.txt', message)</span> as well as this line <span class="keyword">res.setHeader('Content-Type', 'text/html')</span> of code <br></br> The implication for this line <span class="keyword">res.setHeader('Content-Type', 'text/html')</span> is that we reach it too early, so to avoid this, we should actually return before the req.end(...) as such <span class="keyword">return req.on("end", () => {...return res.end()}</span> so it gets executed but the line thereafter doesn't <br></br> And the important implication about this line <span class="keyword">fs.writeFileSync('message.txt', message)</span> will be discussed in the Blocking and Non-Blocking Code section. Below is the updated code with the return statement added  </p>

<br></br>

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!!!!!!!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
```

<br></br>
<br></br>

## <h2 class="sectionHeading"> <a id="blockingNonBlockingCode"> [Blocking and Non-Blocking Code](https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11561906#overview) </a> </h2>

<br></br>

<p class="paraS">So what's wrong with the <span class="keyword">fs.writeFileSync('message.txt', message)</span> line here? <br></br> Its the "sync" keyword. We earlier mentioned that there is also a writeFile method, but we are using the writeFileSync here <br></br> The sync here, stands for synchronous, that is a special method, which will actually block code execution until this file is created <br></br> For this short of a text we entered, its so fast that we won't even notice it, but think about a huge file, that might be a couple hundred of megabytes or even bigger, if we do something that (read it, copy it, ...), and you block the code execution <br></br> In that case, the next line and all the other code will not continue to run until that file operation is done <br></br> Even new incoming requests from other users would not be handled until that file operation is done, which is something we don't want! <br></br> Therefore, we should not use that syntax here (you can if you know you'll have a very short file operation, but even then, its better to not use this) rather we should use <span class="keyword">fs.writeFile('message.txt', message)</span>, now this writeFile method, doesn't just accept the path and the data, but also a third argument <br></br>The third argument is a callback function that should be executed when it's done <br></br> Here again, just like with createServer, Node.js implicitly registers an event listener for us <br></br> The callback function receives an error object, which will be null if no error occurred <br></br> But if some error occurred (missing permissions for example), we would get it here, and we can then handle it gracefully, by returning a different kind of response (an error response showing to the user that an error occurred), otherwise return a normal response <br></br> Here we wont do error handling and there is nothing that can go wrong, will dive into error handling more later on in the course <br></br> We should remove our normal response code (res.statusCode = 302 and res.setheader('location', '/' and return res.end())) in that function because this response should be sent when we are done working with the file, because ultimately that is the action we want to put on our request <br></br> Now we have our event listener, with some method, or function that will be executed once we are done parsing the request <br></br> and in that function that will be executed sometime in the future, have yet another event listener (the nested function, that will be executed once we're done writing the file) <br></br> This is pretty standard for node.js, with an event driven architecture, where we tell the tell node.js to do something, and it will go ahead and offload that process to the operating system, which uses multi-threading. Node.js will then continue its event loop to listen for event callbacks, and always just dispatch tiny actions like that to never block the code execution. Then Node.js always comes back once an operation is done by the operating system and so on <br></br> This is what Node.js does here, and this is why it has a high performance, because it never blocks our code, it never blocks the server, it just goes ahead and tells the operating system to do a bunch of things and then eventually comes back and does something in the callback, like send a response, which is not a blocking operation because this is super fast, just a couple of headers and off we go </p>

<br></br>

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!!!!!!!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
```
