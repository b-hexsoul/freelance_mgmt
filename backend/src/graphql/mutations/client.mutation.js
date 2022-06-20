const Client = require("../../models/Client");
const { ClientType } = require("../schemas/client.schema");
const { GraphQLString, GraphQLID, GraphQLNonNull } = require("graphql");

const ClientMutation = {
  addClient: {
    type: ClientType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      const client = new Client({
        name: args.name,
        email: args.email,
        phone: args.phone,
      });
      return client.save();
    },
  },
  deleteClient: {
    type: ClientType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Client.findByIdAndDelete(args.id);
    },
  },
};

module.exports = { ClientMutation };
