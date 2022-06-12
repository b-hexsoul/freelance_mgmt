const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { ClientQuery } = require("./client.schema");
const { ProjectQuery } = require("./project.schema");
const { ClientMutation } = require("../mutations/client.mutation");
const { ProjectMutation } = require("../mutations/project.mutation");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...ClientQuery,
    ...ProjectQuery,
  },
});

// Mutations
const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    ...ClientMutation,
    ...ProjectMutation,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
