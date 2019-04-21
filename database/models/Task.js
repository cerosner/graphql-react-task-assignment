const db = require('../db')
const Sequelize = require('sequelize')

const { STRING } = Sequelize

const Task = db.define('task', {
  title: {
    type: STRING,
    allowNull: false
  },
  description: {
    type: STRING,
    allowNull: false
  }
})

module.exports = Task
