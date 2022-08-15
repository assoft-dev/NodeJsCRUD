'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grupos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Grupos.init({
    GruposID:  DataTypes.INTEGER,
    Descricao: DataTypes.STRING,
    Comentario: DataTypes.STRING,
    Detalhes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Grupos',
  });
  return Grupos;
};