const { GraphQLString, GraphQLNonNull } = require("graphql");

const UserType = require("../../../modules/user/UserType");
const UserModel = require("../../../modules/user/UserModel");

module.exports = {
  type: UserType,
  args: { email: { type: new GraphQLNonNull(GraphQLString) } },
  resolve: async (_, { email }, context) => {
    if (!context.user) return null;

    return await UserModel.findOne({ email });
  }
};
