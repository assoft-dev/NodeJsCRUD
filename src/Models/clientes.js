'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuarios extends Model {

        static associate(models) {
        }
    }
    Usuarios.init({
        ClientesID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        FullName: DataTypes.STRING,
        LastName: DataTypes.STRING,
        Login: DataTypes.STRING,
        Password: DataTypes.STRING,
        Email: DataTypes.STRING,
        Data: DataTypes.DATE,
        GruposID: DataTypes.INTEGER
    },
        {
            sequelize,
            modelName: 'Clientes',
        });
    return Usuarios;
};