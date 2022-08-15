'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Grupos', [{
      Descricao: 'Caixa',
      Comentario: 'Admins',
      Detalhes: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Grupos', null, {});
  }
};
