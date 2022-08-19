'use strict'

const ValidationContract = require("../Validator/validation-contract");
const usuariosRepository = require("../Repository/UsuariosRepository");
const md5 = require("md5");
var emailServices = require('../Services/EmailServices');
var authServices = require('../Services/AuthServices');


//Buscar toda informação no banco de dados.
exports.GetAll = async (req, res, next) => {
  try {
    var data = await usuariosRepository.GetAll(req.query.FullName);
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
    const UsuariosID = req.params.id;
    var data = await usuariosRepository.Get(UsuariosID)
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: `Não consiguimos encontrar a informação solicitada `,
        Data: { data },
        validate: false,
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

  //Validacoes com contratos
  var contract = new ValidationContract();
  contract.hasMinLen(req.body.Login, 3, 'O nome deve conter pelo menos 3 caracteres');
  contract.isEmail(req.body.Email, 'E-mail inválido');
  contract.hasMinLen(req.body.Password, 4, 'A senha deve conter pelo menos 4 caracteres');

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  // Criar o Modelo
  const usuarios = {
    FullName: req.body.FullName,
    LastName: req.body.LastName,
    Login: req.body.Login,
    Password: md5(req.body.Password + global.SALT_KEY),
    Email: req.body.Email,
    Data: req.body.Data,
    GruposID: req.body.GruposID,
  };

  // Save Tutorial in the database
  try {
    var data = await usuariosRepository.SaveData(usuarios)

    //Envio de Email para o Usuarios.
    emailServices.Sender(
      req.body.Email,
      'Bem vindo ao nosso Sistema',
      global.EMAIL_TMPL.replace("{0}", req.body.FullName)
    );

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
    var data = await usuariosRepository.UpdateData(req.body, id);
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
    var data = await usuariosRepository.Delete(id)
    if (num == 1) {
      res.send({
        message: "Informação Solicitada foi apagada com exito!"
      });
    } else {
      res.status(404).send({
        message: `Não foi possivel apagar a solicitação id =${id}. [Não foi encomtrado]!`
      });
    }
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Falha ao processar sua requisição "
    });
  }
};


//Auth
exports.Auth = async (req, res, next) => {

  //Validacoes com contratos
  var contract = new ValidationContract();
  contract.hasMinLen(req.body.Login, 3, 'O nome deve conter pelo menos 3 caracteres');
  contract.isEmail(req.body.Email, 'E-mail inválido');
  contract.hasMinLen(req.body.Password, 4, 'A senha deve conter pelo menos 4 caracteres');

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  // Criar o Modelo
  const usuarios = {
    Login: req.body.Login,
    Password: md5(req.body.Password + global.SALT_KEY),
    Email: req.body.Email,
    Data: req.body.Data
  };

  // Save Tutorial in the database
  try {
    var data = await usuariosRepository.Authenticate(usuarios);
    if (!data) {
      res.status(404).send({
        message: 'Usuário ou senha inválidos'
      });
      return;
    }

    const token = await authServices.GenerateToken({
      UsuariosID: data.UsuariosID,
      Email: data.Email,
      Login: data.Login,
      Grupos: data.Grupos
    });

    res.status(201).send({
      token: token,
      data: {
        Email: data.Email,
        FullName: data.FullName
      }
    });

  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Falha ao processar sua requisição "
    })
  }
};

exports.refreshToken = async(req, res, next) => {
  try {
      const token = req.body.token || req.query.token || req.headers['x-access-token'];
      const data = await authServices.decodeToken(token);

      const usuarios = await usuariosRepository.Get(data.UsuariosID);

      if (!usuarios) {
          res.status(404).send({
              message: 'Usuario não encontrado!'
          });
          return;
      }

      const tokenData = await authServices.GenerateToken({
        UsuariosID: usuarios.UsuariosID,
        Email: usuarios.Email,
        Login: usuarios.Login,
        Grupos: usuarios.Grupos
      });

      res.status(201).send({
          token: tokenData,
          data: {
              Email: usuarios.Email,
              FullName: usuarios.FullName
          }
      });
  } catch (e) {
      res.status(500).send({
          message: 'Falha ao processar sua requisição'
      });
  }
};