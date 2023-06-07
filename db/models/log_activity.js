'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log_activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  log_activity.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tanggal: DataTypes.DATE,
    aktivitas: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'log_activity',
  });
  return log_activity;
};