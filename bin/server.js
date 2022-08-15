'use strict'

const app = require("../src/app");
const http = require("http");

const port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

//Rotas
const server = http.createServer(app);

server.listen(port);
server.on("error", OnError)
console.log("API rodando na porta " + port);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return val;
    }

    return false;
}

function OnError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'Requer previlegio de admin')
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' Porta em Utilização')
            process.exit(1);
            break;
        default:
            break;
    }

}

