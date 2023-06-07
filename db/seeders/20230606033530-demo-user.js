'use strict';

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  const salt = await bcrypt.genSalt();
  

    await queryInterface.bulkInsert("users", [{
      id_user: uuidv4(),
      nama: "admin",
      email: "admin@gmail.com",
      password: await bcrypt.hash("admin", salt),
      role: "admin" 
    },
    {
      id_user: uuidv4(),
      nama: "pegawai",
      email: "pegawai@gmail.com",
      password: await bcrypt.hash("pegawai", salt),
      role: "pegawai" 
    },
    {
      id_user: uuidv4(),
      nama: "pelanggan",
      email: "pelanggan@gmail.com",
      password: await bcrypt.hash("pelanggan", salt),
      role: "pelanggan" 
    }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
      await queryInterface.bulkDelete('users', null, {});
  }
};
