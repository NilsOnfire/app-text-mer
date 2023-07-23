var debug = require('debug')('app-textmer:server');
/**
 * Normalize a port into a number, string, or default(3000).
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return 3000;
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(server) {
    return () => {
        let addr = server.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr.address
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
        console.log(bind)
    }
}
/**
 * Event listener for HTTP server "error" event.
 * @param {Error} error
 */

function onError(port) {
    return (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
            default:
                throw error;
        }
    }
}

module.exports = {
    normalizePort,
    onListening,
    onError
}