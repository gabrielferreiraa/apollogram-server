const { GraphQLString, GraphQLNonNull } = require("graphql");

const UserType = require("../../../modules/user/UserType");
const UserModel = require("../../../modules/user/UserModel");

module.exports = {
  type: UserType,
  resolve: async (_, __, context) => {
    if (!context.user) return null;

    const { _id } = context.user;

    return await UserModel.findOne({ _id });
  },
};
