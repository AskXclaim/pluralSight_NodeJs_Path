"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
var hostName = (_b = process.env.HOST) !== null && _b !== void 0 ? _b : "127.0.0.1";
var server = http_1.default.createServer(function (req, res) {
    res.statusCode = 200;
});
