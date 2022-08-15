'use strict'

//Chamada dos controllers
const grupocontroller = require("../Controllers/GruposControllers");

const express = require('express')
const route = express.Router()

route.get("/", grupocontroller.GetAll);
route.get("/:id", grupocontroller.Get);

route.post("/", grupocontroller.Guardar);

route.put("/:id", grupocontroller.Atualuzar);

route.delete("/:id", grupocontroller.Apagar);
route.delete("/", grupocontroller.ApagarAll);

module.exports = route;