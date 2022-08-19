'use strict'

const db = require("../Models");
const Grupos = db.Grupos;
const Op = db.Sequelize.Op;

const { Usuarios } = require("../Models");

exports.GetAll = async (param) => {
    const descricao = param;
    var condition = descricao ? { Descricao: { [Op.like]: `%${descricao}%` } } : null;
    const res = await Grupos.findAll({ where: condition, include: Usuarios });
    return res;
};

exports.Get = async (param) => {
    const GruposID = param;
    var res = await Grupos.findByPk(GruposID, { include: Usuarios });
    return res;
};

exports.SaveData = async (param) => {
    const res = await Grupos.create(param);
    return res;
};

exports.UpdateData = async (body, id) => {
    const res = await Grupos.update(body, {
        where: { GruposID: id }
    });
    return res;
};

exports.Delete = async (id) => {
    const res = await Grupos.destroy({
        where: { GruposID: id }
    });
    return res;;
};