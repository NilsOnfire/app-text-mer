const { port, hostName, server, app } = require("./app");
const { onError, onListening } = require("./utils/www");

app.listen(port, hostName, () => {
    console.log(`App listening on  http://${hostName + ":" + port}`)
});

app.on('error', onError(port));
app.on('listening', onListening(server));