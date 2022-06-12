const Project = require("../../models/Project");
const { ClientType } = require("./client.schema");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parentValue, args) {
        return Client.findById(parentValue.clientId);
      },
    },
  }),
});

const ProjectQuery = {
  projects: {
    type: new GraphQLList(ProjectType),
    resolve(parentValue, args) {
      return Project.find({});
    },
  },
  project: {
    type: ProjectType,
    args: { id: { type: GraphQLID } },
    resolve(parentValue, args) {
      // return our data here via mongodb, put mongodb fn
      return Project.find({ id: args.id });
    },
  },
};

module.exports = { ProjectType, ProjectQuery };
