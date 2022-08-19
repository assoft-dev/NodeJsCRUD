'use strict'

//Instancias
var authServices = require("../Services/AuthServices");

//Chamada dos controllers
const usuarioscontroller = require("../Controllers/UsuariosControllers");

const express = require('express');
const route = express.Router();

//Rotas
route.get("/", authServices.Authorize, usuarioscontroller.GetAll);
route.get("/:id", authServices.Authorize, usuarioscontroller.Get);

route.post("/", authServices.Authorize, usuarioscontroller.Guardar);
route.post("/auth", usuarioscontroller.Auth);
route.post("/refresh-token", authServices.Authorize, usuarioscontroller.Auth);

route.put("/:id", authServices.Authorize, usuarioscontroller.Atualuzar);

route.delete("/:id", authServices.Authorize, usuarioscontroller.Apagar);

module.exports = route;