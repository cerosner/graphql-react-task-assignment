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
