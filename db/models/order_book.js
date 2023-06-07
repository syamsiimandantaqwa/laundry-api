'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class order_book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_book.belongsTo(models.user, {
        foreignKey: "id_user",
        as: "pengguna"
      })

      order_book.belongsTo(models.service, {
        foreignKey: "id_layanan",
        as: "layanan"
      });

      order_book.belongsTo(models.transaction_detail, {
        foreignKey:"id_pesanan",
        as: "detail_transaksi"
      })

    }
  }
  order_book.init({
    id_pesanan: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model:"users",
        key: "id_user",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    id_layanan: DataTypes.INTEGER,
    id_user: DataTypes.UUID,
    total: DataTypes.INTEGER,
    tgl_transaksi: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'order_book',
  });

  order_book.beforeCreate(async (order, options) => {
    try {
      await sequelize.models.log_activity.create({
      id_user: order.id_user,
      tanggal: new Date(),
      aktivitas: `membuat pesanan baru dengan total ${order.total}`
      })
    } catch (err) {
      console.log(err)
    }
  });

  return order_book;
};