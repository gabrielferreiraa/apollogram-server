const { GraphQLString, GraphQLNonNull } = require("graphql");

const UserType = require("../../../modules/user/UserType");
const UserModel = require("../../../modules/user/UserModel");

module.exports = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    picture: { type: GraphQLString },
  },
  resolve(_, { name, email, password, picture }) {
    const user = new UserModel({
      name,
      email,
      password,
      picture,
    });

    return user.save();
  },
};
