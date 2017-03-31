

var config = require('../config');
module.exports = function () {
    if (config.debugMode === 0) {
        return;
    } else if (config.debugMode == 1) {
        for (var k in arguments) {
            throw new Error(arguments[k]);
        }
    } else if (config.debugMode > 1) {
        for (var k in arguments) {
            console.log(arguments[k]);
        }
    }
} || module.exports;;