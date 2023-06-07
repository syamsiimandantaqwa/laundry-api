'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_books', {
      id_pesanan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_layanan: {
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.UUID
      },
      total: {
        type: Sequelize.INTEGER
      },
      tgl_transaksi: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_books');
  }
};