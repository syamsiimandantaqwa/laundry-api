'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction_detail.hasOne(models.order_book, {
        foreignKey: "id_pesanan",
      })

    }
  }
  transaction_detail.init({
    tgl_pengambilan: DataTypes.DATE,
    alamat: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    tgl_pengembalian: DataTypes.DATE,
    status: DataTypes.STRING,
    id_pesanan: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
       references: {
        model:"order_books",
        key: "id_pesanan",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'transaction_detail',
  });
  return transaction_detail;
};