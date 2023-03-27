const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
 
}, {
  tableName: 'carts',
  timestamps: false
});

module.exports = Cart;


