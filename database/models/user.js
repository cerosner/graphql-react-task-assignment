const db = require('../db')
const { STRING } = require('sequelize')

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
