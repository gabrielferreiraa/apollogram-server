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
    await UserModel.updateOne({ _id }, user);
    return await UserModel.findOne({ _id });
  }
};
