const express = require('express')
const bodyParser = require('body-parser')
const PORT = 8080
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

app.use(bodyParser.json())

app.use('/graphql', graphqlHttp({
  // define type requirements then initialize into valid schema
  schema: buildSchema(`
    type RootQuery {
      tasks: [String!]!
    }

    type RootMutation {
      createTask(name: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  // resolver functions obj that points to different endpoints
  rootValue: {
    // query type - GET
    tasks: () => {
      return ['cook', 'clean']
    },
    // mutation type - POST/PUT/DELETE
    createTask: (args) => {
      return args.name
    }
  },
  // turn on user interface to check routes
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`> I'm listening (:`)
  console.log(`> http://localhost:${PORT}/graphql`)
})
