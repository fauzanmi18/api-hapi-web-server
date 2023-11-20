const sequelize = require('sequelize')
const db = require('./database')

const { DataTypes } = sequelize

const Books = db.define('books', {
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    author: DataTypes.STRING,
    summary: DataTypes.TEXT,
    publisher: DataTypes.STRING,
    pageCount: DataTypes.INTEGER,
    readPage: DataTypes.INTEGER,
    finished: DataTypes.STRING,
    reading: DataTypes.STRING
},{
    freezeTableName: true
})

module.exports = Books