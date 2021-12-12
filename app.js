// Creating a server: 1
const http = require("http");

// Routes Handler
const routes = require("./routes");

// Creating a server: 2
const server = http.createServer(routes);

// Creating a server: 3
server.listen(3000);
