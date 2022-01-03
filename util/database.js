// setting up the code that will allow me to connect to the mysql database
const mysql = require("mysql2");

/*
    there are two ways of connecting to the sql database

    1) setting up one connection that we can use to run queries, this connection should be closed when we are done with the query

            => Downside: the code needs to be re-executed to create the connection for every new query
                
                => this is in-efficient

    2) Setting up a connection pool:

            => A pool of query connections that we can reach out to whenever we have a query to run

                => this gives us a new connection from that pool that manages multiple connections

                    => this in turn allows us to run multiple queries simultaneously

                        => Once the query is done, the connection will be handed back into the pool and is available again for a new query

                            => The pool is finished when our application shuts down

*/

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "",
});

// using promise chains to export that will allow us to use promises for async connections
module.exports = pool.promise();
