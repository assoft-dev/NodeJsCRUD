'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      UsuariosID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validator: {
          notEmpty: {
            msg: "O campo NomeCompleto não pode estar Vazio."
          }
        }
      },
      LastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validator: {
          notEmpty: {
            msg: "O campo Ultimo nome não pode estar Vazio."
          }
        }
      },
      Login: {
        type: Sequelize.STRING,
        allowNull: false,
        validator: {
          notEmpty: {
            msg: "O campo login não pode estar Vazio."
          }
        }
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false,
        validator: {
          notEmpty: {
            msg: "O campo Password não pode estar Vazio."
          }
        }
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        validator: {
          notEmpty: {
            msg: "O campo Email não pode estar Vazio."
          }
        }
      },
      Data: {
        type: Sequelize.DATE
      },

      GruposID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validator: {
          notEmpty: {
            msg: "Precisamos do grupo a que ele pertence por favor"
          }
        },
        References: {
          models: "Grupos",
          key: "GruposID"
        },
        onDelete: 'cascade'
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
    await queryInterface.dropTable('Usuarios');
  }
};