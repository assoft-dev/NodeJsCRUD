'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuarios.init({
    FullName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Login: DataTypes.STRING,
    Password: DataTypes.STRING,
    Email: DataTypes.STRING,
    Data: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};