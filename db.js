const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('modulo_7_portafolio', 'postgres', 'Anahata4', {
  host: 'localhost',
  dialect: 'postgres',
});
module.exports = sequelize;
