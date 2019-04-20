const express = require('express')
const bodyParser = require('body-parser')
const PORT = 8080

// GraphQL is a typed language

const graphqlHttp = require('express-graphql')
/*
  middleware that routes requests through GraphQL
  query parser '/graphql' endpoint to be handled
  by the schemas that we define to be forwarded
  to the associated resolver endpoints that we create

  takes an obj with 3 properties to configure apis
    - schema    // takes buildSchema()
    - rootValue // obj of resolver functions
    - graphiql  // optional UI to test apis @ '/graphql'
*/

const { buildSchema } = require('graphql')
/*
  parses and converts data to be used by middleware
  that takes a `multi-line template literal string`
  that defines our schemas

  must adhere to GraphQL command specifications that
  are looking for certain keywords:
    - schema
      . query: entry point for GET requests
      . mutation: entry point for POST/PUT/DELETE requests
    - type  // custom objects
    - input // complex objects
*/

const app = express()

// placeholder db
const tasks = []

app.use(bodyParser.json())

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Task {
      id: String!
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
      createTask(taskInput: TaskInput): Task
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    tasks: () => {
      return tasks
    },
    createTask: (args) => {
      const task = {
        id: Math.random().toString(),
        title: args.taskInput.title,
        description: args.taskInput.description
      }

      tasks.push(task)
      return task
    }
  },
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`> I'm listening (:`)
  console.log(`> http://localhost:${PORT}/graphql`)
})
