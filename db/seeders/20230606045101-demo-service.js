'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [{
      nama_layanan: "satuan",
      id_layanan: 1,
      harga: 5000,
      keterangan: "layanan ini di hitung untuk setiap pakaian jadi sedikit lebih mahal  daripada kiloan"
    },
    {
      nama_layanan: "kiloan",
      id_layanan: 2,
      harga: 25000,
      keterangan: "layanan ini di hitung untuk per kilo dari semua pakaian yang akan di cuci"
    },
    {
      nama_layanan: "khusus",
      id_layanan: 3,
      harga: 10000,
      keterangan: "layanan ini di hitung untuk setiap pakaian yang berukuran besar dan memiliki bobot lebih dari 1 kg / pakaian  contoh: (kasur lantai, bantal guling), anda bisa menggunakan layanan ini jika anda hanya ingin mencuci hanya 1 / 2 pakaian saja"
    }]

    await queryInterface.bulkInsert("services", data,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('services', null, {});
  }
};
