const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Gourab@007',{
    dialect: 'mysql', 
    host: 'localhost'
})


module.exports = sequelize;