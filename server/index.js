const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const bcrypt = require('bcryptjs')
const { buildSchema } = require('graphql')
const { db, Tasks, Users } = require('../database')

const PORT = 8080
const app = express()

app.use(bodyParser.json())

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Task {
      id: ID!
      title: String!
      description: String!
    }

    type User {
      id: ID!
      email: String!
      password: String
    }

    input TaskInput {
      title: String!
      description: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      tasks: [Task!]!
    }

    type RootMutation {
      createTask(taskInput: TaskInput!): Task!
      deleteTask(taskId: ID!): Task
      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    tasks: () => {
      return Tasks.findAll()
      .then(allTasks => allTasks)
      .catch(err => {
        console.log(err)
        throw err
      })
    },
    createTask: args => {
      const { title, description } = args.taskInput
      const newTask = { title, description }

      return Tasks.create(newTask)
      .then(createdTask => createdTask)
      .catch(err => {
        console.log(err)
        throw err
      })
    },
    deleteTask: args => {
      Tasks.findOne({
        where: { id: args.taskId }
      })
      .then(taskToDelete => taskToDelete.destroy())
      .catch(err => {
        console.log(err)
        throw err
      })
    },
    createUser: args => {
      const { email, password } = args.userInput
      let newUser = { email, password }

      return bcrypt.hash(password, 12)
      .then(hashedPassword => {
        newUser.password = hashedPassword

        return Users.create(newUser)
        .then(createdUser => {
          createdUser.password = null

          return createdUser
        })
        .catch(err => {
          console.log(err)
          throw err
        })
      })
      .catch(err => {
        console.log(err)
        throw err
      })
    }
  },
  graphiql: true
}))

db.sync()
  .then(() => app.listen(PORT, () => {
  console.log(`> I'm listening (:`)
  console.log(`> http://localhost:${PORT}/graphql`)
}))
