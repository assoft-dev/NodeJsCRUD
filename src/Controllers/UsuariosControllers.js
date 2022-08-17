'use strict'

const { Grupos } = require("../Models");
const db = require("../Models");
const Usuarios = db.Usuarios;
const Op = db.Sequelize.Op;

// Buscar toda informação no banco de dados.
exports.GetAll = (req, res) => {
  const FullName = req.query.FullName;
  var condition = FullName ? { FullName: { [Op.like]: `%${FullName}%` } } : null;

  Usuarios.findAll({ where: condition, include: { model: Grupos, as: 'Grupos' } })
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
  const UsuariosID = req.params.id;

  Usuarios.findByPk(UsuariosID, {include: { model: Grupos, as: 'Grupos' } } )
    .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Não consiguimos encontrar uma chave id=${UsuariosID}. com esta caracteristicas`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao buscar com esta chave =" + UsuariosID
      });
    });
};


// Create and Save a new Tutorial
exports.Guardar = (req, res, next) => {

  // Validate request
  if (!req.body.Descricao) {
    res.status(400).send({
      message: "Este campo não permite valores nulos!"
    });
    return;
  }

  // Criar o Modelo
  const model = {
    FullName: req.body.FullName,
    LastName: req.body.LastName,
    Login: req.body.Login,
    Password: req.body.Password,
    Email: req.body.Email,
    Data: req.body.Data,
    GrupoID: req.body.Data,
  };

  // Save Tutorial in the database
  Usuarios.create(model)
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

  Usuarios.update(req.body, {
    where: { UsuariosID: UsuariosID }
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
  const UsuariosID = req.params.id;

  Usuarios.destroy({
    where: { UsuariosID: UsuariosID }
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
  Usuarios.destroy({
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
