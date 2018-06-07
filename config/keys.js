if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    //we are in development - return dev keys
    module.exports = require('./dev');
}