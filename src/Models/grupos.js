'use strict';

const {
  Model
} = require('sequelize');
const usuarios = require('./usuarios');
module.exports = (sequelize, DataTypes) => {
  class Grupos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Grupos.hasMany(models.Usuarios)
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