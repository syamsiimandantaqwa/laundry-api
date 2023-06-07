'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaction_details', {
      tgl_pengambilan: {
        type: Sequelize.DATE
      },
      alamat: {
        type: Sequelize.STRING
      },
      no_hp: {
        type: Sequelize.STRING
      },
      tgl_pengembalian: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      id_pesanan: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaction_details');
  }
};