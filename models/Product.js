const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db.js');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdat',
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedat',
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'productos',
    timestamps: false, 
  }
  
);

module.exports = Product;

