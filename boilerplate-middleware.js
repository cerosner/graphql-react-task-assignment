// GraphQL is a typed language

/* { buildSchema } from `graphql package`

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

/* graphqlHttp from `express-graphql` package

  middleware that routes requests through GraphQL
  query parser '/graphql' endpoint to be handled
  by the schemas that we define to be forwarded
  to the associated resolver endpoints that we create

  takes an obj with 3 properties to configure apis
    - schema    // takes buildSchema()
    - rootValue // obj of resolver functions
    - graphiql  // optional UI to test apis @ '/graphql'
*/

/*
app.use('graphql', graphqlHttp({
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
}))
*/
