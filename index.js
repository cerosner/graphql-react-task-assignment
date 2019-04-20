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
  parses and converts data to be used by
  middleware that takes a `multi-line template
  literal string` that defines our schemas

  must adhere to GraphQL command specifications that are
  looking for certain keywords

  --- BOILERPLATE ---

    graphqlHttp({
      schema: buildSchema(`
        type RootQuery {
          data: [typeof data!]! // ! = not null
        }

        type RootMutation { // methods
          addData(param: typeof param): typeof data
          updateData(): ...
          deleteData(): ...
        }

        schema {
          query: fetch data from RootQuery
          mutation: change data from RootMutation
        }
      `),
      rootValue: {
        // must use same names found in schema definition
        data: () => {
          return data
        },
        addData: (args) => {  // args carries obj of all params
          store args.param
        }
      },
      graphiql: boolean
    })

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
        title: args.title,
        description: args.description
      }
      tasks.push(task)
    }
  },
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`> I'm listening (:`)
  console.log(`> http://localhost:${PORT}/graphql`)
})
