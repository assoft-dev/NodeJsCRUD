'use strict'

const { Usuarios } = require("../Models");
const db = require("../Models");
const ValidationContract = require("../Validator/validation-contract");

const Grupos = db.Grupos;
const Op = db.Sequelize.Op;

// Buscar toda informação no banco de dados.
exports.GetAll = (req, res) => {
  const descricao = req.query.Descricao;
  var condition = descricao ? { Descricao: { [Op.like]: `%${descricao}%` } } : null;

  Grupos.findAll({ where: condition, include: Usuarios})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({

        message:
          err.message || "Não foi possivel buscar a informação solicitada."
      });
    });
};

// Find a single Tutorial with an id
exports.Get = (req, res) => {
  const GruposID = req.params.id;

  Grupos.findByPk(GruposID, { include: Usuarios})
    .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Não consiguimos encontrar uma chave id=${GruposID}. com esta caracteristicas`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Erro ao buscar com esta chave =" + id
      });
    });
};


// Create and Save a new Tutorial
exports.Guardar = (req, res, next) => {

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
  Grupos.create(grupos)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro algo tenha acontecido ao crear o Grupo."
      });
    });
};

// Update a Tutorial by the id in the request
exports.Atualuzar = (req, res) => {
  const id = req.params.id;

  Grupos.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: req.body
        });
      } else {
        res.send({
          message: `Não conseguimos atualizar com esta licença=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Erro na na Atualização da informação=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.Apagar = (req, res) => {
  const id = req.params.id;

  Grupos.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Informação Solicitada foi apagada com exito!"
        });
      } else {
        res.send({
          message: `Não foi possivel inserir apagar com a chave id=${id}. Não foi encomtrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Não conseguimos apagar od dados com a chave id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.ApagarAll = (req, res) => {
  Grupos.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Foram apagadas todas as informações!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Não foi possivel apagar toda a informação."
      });
    });
};
