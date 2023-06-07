'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.order_book, {
        foreignKey: 'id_user',
        as: "pesanan"
      })
    }
  }
  user.init({
    id_user: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model:"order_books",
        key: "id_user",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    email: DataTypes.STRING,
    nama: DataTypes.STRING,
    password: DataTypes.TEXT,
    role: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'user',
  });
  return user;
};