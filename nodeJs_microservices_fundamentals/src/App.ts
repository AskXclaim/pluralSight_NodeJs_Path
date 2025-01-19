import http from "http";

const port =parseInt( process.env.PORT ?? "3000");
const hostName = process.env.HOST ?? "127.0.0.1";
const server =
    http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Hello World\n");
    });

server.listen(port, hostName, () => {
    console.log(`Server started and running on http://${hostName}:${port}/`);
});