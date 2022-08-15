'use strict'

//Chamada dos controllers
const usuarioscontroller = require("../Controllers/UsuariosControllers");

const express = require('express');
const route = express.Router();

route.get("/", usuarioscontroller.GetAll);
route.get("/:id", usuarioscontroller.Get);

route.post("/", usuarioscontroller.Guardar);

route.put("/:id", usuarioscontroller.Atualuzar);

route.delete("/:id", usuarioscontroller.Apagar);
route.delete("/", usuarioscontroller.ApagarAll);

module.exports = route;