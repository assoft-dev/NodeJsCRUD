'use strict'

const ValidationContract = require("../Validator/validation-contract");
const grupoRepository = require("../Repository/GruposRepository.js");

//Buscar toda informação no banco de dados.
exports.GetAll = async (req, res, next) => {
  try {
    var data = await grupoRepository.GetAll(req.query.Descricao);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Falha ao processar sua requisição "
    })
  }
};

// Find a single Tutorial with an id
exports.Get = async (req, res) => {

  try {
    const GruposID = req.params.id;
    var data = await grupoRepository.Get(GruposID)
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: `Não consiguimos encontrar a informação solicitada`
      });
    }
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Falha ao processar sua requisição "
    })
  }
};

// Create and Save a new Tutorial
exports.Guardar = async (req, res, next) => {

  // Validate request
  ValidationContract.isRequired(req.body.Descricao, "Este campo não permite valores nulos!");
  if (!ValidationContract.isValid()) {
    res.status(400).send(ValidationContract.errors).end();
    return;
  }

  // Criar o Modelo
  const grupos = {
    Descricao: req.body.Descricao,
    Comentario: req.body.Comentario,
    Detalhes: req.body.Detalhes
  };

  // Save Tutorial in the database
  try {
    var data = await grupoRepository.SaveData(grupos)
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Falha ao processar sua requisição "
    })
  }
};

// Update a Tutorial by the id in the request
exports.Atualuzar = async (req, res) => {
  try {
    const id = req.params.id;
    var data = await grupoRepository.UpdateData(req.body, id);
    if (data == 1) {
      res.status(200).send({ message: req.body });
    } else {
      res.status(404).send({
        message: `Não conseguimos atualizar a informação solicitada!`
      });
    }
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Falha ao processar sua requisição "
    })
  }
};

// Delete a Tutorial with the specified id in the request
exports.Apagar = async (req, res) => {

  try {
    const id = req.params.id;
    var data = await grupoRepository.Delete(id)
    if (num == 1) {
      res.send({
        message: "Informação Solicitada foi apagada com exito!"
      });
    } else {
      res.status(404).send({
        message: `Não foi possivel apagar a solicitação id=${id}. [Não foi encomtrado]!`
      });
    } 
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Falha ao processar sua requisição "
    });
  }
};

// Delete all Tutorials from the database.
exports.ApagarAll = async (req, res) => {
  try {
    var data = await grupoRepository.DeleteAll();
    if (data == 1) {
      res.send({
        message: "A informação Solicitada foi apagada com exito!"
      });
    } else {
      res.status(404).send({
        message: `Não foi possivel apagar a solicitação id=${id}. [Não foi encomtrado]!`
      });
    } 
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Falha ao processar sua requisição "
    });
  }
};
