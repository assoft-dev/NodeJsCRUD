'use strict';

const {
  Model
} = require('sequelize');
const usuarios = require('./usuarios');
module.exports = (sequelize, DataTypes) => {
  class Grupos extends Model {

    static associate(models) {
    }
  }
  Grupos.init({
    GruposID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    Descricao: DataTypes.STRING,
    Comentario: DataTypes.STRING,
    Detalhes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Grupos',
  });
  return Grupos;
};