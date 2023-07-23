
let express = require("express");
const http = require('http');
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const dotenv = require("dotenv");
const { normalizePort } = require("./utils/www");
const { notFoundMiddleWare } = require("./middlewares/errors");
const digramRouter = require("./routes/diagram.routes");
dotenv.config()

const app = express();
const server = http.createServer(app);
const port = normalizePort(process.env["SERVER_PORT"] || 3000);
const hostName = process.env["HOST_NAME"] || "127.0.0.1";

app.use(logger("dev"));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));


// Application routing
app.use('/api/diagrams', digramRouter);

// catch 404 and forward to error handler
app.use(notFoundMiddleWare);
app.set('port', port);

module.exports = {
    app,
    server,
    hostName,
    port
}