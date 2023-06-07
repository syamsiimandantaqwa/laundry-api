'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      service.hasOne(models.order_book, {
        foreignKey: "id_layanan"
      })

    }
  }
  service.init({
    nama_layanan: DataTypes.STRING,
    id_layanan: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
       references: {
        model:"order_books",
        key: "id_layanan",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE"
    },
    harga: DataTypes.INTEGER,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'service',
  });

  return service;
};