const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const { db, Tasks } = require('../database')
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

    input TaskInput {
      title: String!
      description: String!
    }

    type RootQuery {
      tasks: [Task!]!
    }

    type RootMutation {
      createTask(taskInput: TaskInput!): Task!
      deleteTask(taskId: ID!): Task
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

      const newTask = {
        title,
        description
      }
      
      return Tasks.create(newTask)
      .then(createdTask => createdTask)
      .catch(err => {
        console.log(err)
        throw err
      })
    },
    deleteTask: args => {
      Tasks.findOne({
        where: {
          id: args.taskId
        }
      })
      .then(taskToDelete => taskToDelete.destroy())
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
