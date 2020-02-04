const { GraphQLObjectType, GraphQLString } = require("graphql");
const UserType = require("./UserType");
const UserModel = require("./models/UserModel");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  description: "The root of all mutations",
  fields: () => ({
    registerUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve(_, args) {
        const user = new UserModel({
          _id: Math.random().toString(36).substr(2, 9),
          name: args.name,
          email: args.email
        });

        return user.save();
      }
    }
  })
});
