const sequelize = require('sequelize')

const db = new sequelize({
    database: 'belajar_api',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = db