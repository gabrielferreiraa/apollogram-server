const { GraphQLString } = require("graphql");

const UserType = require("../../../modules/user/UserType");
const UserModel = require("../../../modules/user/UserModel");

module.exports = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  resolve: async (_, user, { user: { _id } }) => {
    return await UserModel.findOneAndUpdate({ _id }, user);
  }
};
