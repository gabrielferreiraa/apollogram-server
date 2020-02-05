const { GraphQLList } = require("graphql");

const UserType = require("../../../modules/user/UserType");
const UserModel = require("../../../modules/user/UserModel");

module.exports = {
  type: new GraphQLList(UserType),
  resolve: async (_, __, context) => {
    if (!context.user) return null;

    return await UserModel.find({});
  }
};
