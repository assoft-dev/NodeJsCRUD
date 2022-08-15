'use strict'

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Importar Rotas
const Index_router = require("./routers/Index-router");
const grupos_router = require("./routers/Grupos-Router");
const usuarios_router = require("./routers/Usuarios-Router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", Index_router);
app.use("/api/grupos", grupos_router);
app.use("/api/usuarios", usuarios_router);

module.exports = app;