const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MedX', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;
