
const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Product = require('./Product.js');
const Cart = require('./Cart.js');


const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'cart_items',
  timestamps: false
});

CartItem.belongsTo(Product);
CartItem.belongsTo(Cart);

module.exports = CartItem;