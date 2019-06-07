const db = require('../db')
const Sequelize = require('sequelize')

const { STRING } = Sequelize

const User = db.define('user', {
  email: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  }
})

module.exports = User
