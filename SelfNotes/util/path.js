const path = require("path");

// exporting a variable that will help me construct a path to the parent directory
// process is a global variable available in all files (no need to import it), it gives us mainModule property (referring to the main module that started our application => the module created in app.js)
// Now we can call filename to find out in which file this module was spun up (this gives us the path to the file that is responsible of the fact that the application is running)
// This filename is what we put into dirname to get a path to that directory
module.exports = path.dirname(process.mainModule.filename);

// If we get a deprecation warning for that code - in that case, we can simply switch to this code:
// module.exports = path.dirname(require.main.filename);
