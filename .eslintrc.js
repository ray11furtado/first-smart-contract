module.exports = {
    "extends": "airbnb-base",
    "env": {
        "browser": true, // browser global variables
        "node": true, // Node.js global variables and Node.js scoping.
        "mocha": true // adds all of the Mocha testing global variables.
    },
    "plugins": [
        "mocha"
    ],
};