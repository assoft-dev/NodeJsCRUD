'use strict'

//Chamada dos controllers
const grupocontroller = require("../Controllers/GruposControllers");
var  authServices = require("../Services/AuthServices")

const express = require('express')
const route = express.Router()

route.get("/", authServices.Authorize, grupocontroller.GetAll);
route.get("/:id", authServices.Authorize, grupocontroller.Get);

route.post("/", authServices.Authorize, grupocontroller.Guardar);

route.put("/:id", authServices.Authorize, grupocontroller.Atualuzar);

route.delete("/:id", authServices.Authorize, grupocontroller.Apagar);

module.exports = route;