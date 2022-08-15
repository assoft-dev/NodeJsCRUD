'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Grupos', {
      GruposID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Descricao: {
        allowNull: false,
        type: Sequelize.STRING,
        validator:{
          notEmpty:{
              msg:"Este campo Descrião não permite nullo"
          }
        }
      },
      Comentario: {
        type: Sequelize.STRING
      },
      Detalhes: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Grupos');
  }
};