const db = require('./db')
const Tasks = require('./models/task')
const Users = require('./models/user')

Users.hasMany(Tasks)
Tasks.belongsTo(Users)

module.exports = {
  db,
  Tasks,
  Users
}
