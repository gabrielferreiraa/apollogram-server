const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const UserType = require("./UserType");
const UserModel = require("./models/UserModel");

module.exports = new GraphQLObjectType({
  name: "Query",
  description: "The root of all queries",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => await UserModel.find({})
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString }},
      resolve: async (_, { id }) => await UserModel.findOne({ _id: id })
    }
  })
});
