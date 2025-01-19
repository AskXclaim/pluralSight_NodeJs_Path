"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "3000");
const hostName = (_b = process.env.HOST) !== null && _b !== void 0 ? _b : "127.0.0.1";
const server = http_1.default.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World\n");
});
server.listen(port, hostName, () => {
    console.log(`Server started and running on http://${hostName}:${port}/`);
});
