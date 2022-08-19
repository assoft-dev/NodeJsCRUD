'use strict'

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Importar Rotas
const Index_router = require("./routers/Index-router");
const grupos_router = require("./routers/Grupos-Router");
const usuarios_router = require("./routers/Usuarios-Router");

app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use("/", Index_router);
app.use("/api/grupos", grupos_router);
app.use("/api/usuarios", usuarios_router);

// const conect = require("./Models");
// conect.sequelize.sync({ alter: true });

module.exports = app;