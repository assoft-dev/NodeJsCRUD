'use strict'

const db = require("../Models");
const usuarios = db.Usuarios;
const Op = db.Sequelize.Op;

const { Grupos } = require("../Models");

exports.GetAll = async (param) => {
    const descricao = param;
    var condition = descricao ? { FullName: { [Op.like]: `%${descricao}%` } } : null;
    const res = await usuarios.findAll({ where: condition, include: {
        model: Grupos, as: 'Grupos' } });
    return res;
};

exports.Get = async (param) => {
    const UsuariosID = param;
    var res = await usuarios.findByPk(UsuariosID, { include: {model: Grupos, as: 'Grupos'} });
    return res;
};

exports.Authenticate = async (param) => {
    const res = await usuarios.findOne({ 
        where: { Email: param.Email, Password: param.Password }, include: {
            model: Grupos, as: 'Grupos'
        } }, );
    return res;
};

exports.SaveData = async (param) => {
    const res = await usuarios.create(param);
    return res;
};

exports.UpdateData = async (body, id) => {
    const res = await usuarios.update(body, {
        where: { UsuariosID : id }
    });
    return res;
};

exports.Delete = async (id) => {
    const res = await usuarios.destroy({
        where: { UsuariosID : id }
    });
    return res;;
};