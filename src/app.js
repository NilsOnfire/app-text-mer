var createError = require("http-errors");
var express = require("express");
const http = require('http');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

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