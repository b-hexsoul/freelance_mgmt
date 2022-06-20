const Client = require("../../models/Client");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");

// Client Type
const ClientType = new GraphQLObjectType({
  name: "client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ClientQuery = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve(parentValue, args) {
      return Client.find({});
    },
  },
  client: {
    type: ClientType,
    args: { id: { type: GraphQLID } },
    resolve(parentValue, args) {
      // return our data here via mongodb, put mongodb fn
      return Client.findById(args.id);
    },
  },
};

module.exports = { ClientType, ClientQuery };
