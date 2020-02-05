const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const UserType = require("../../modules/user/UserType");
const UserModel = require("../../modules/user/UserModel");

const PostType = require("../../modules/post/PostType");
const PostModel = require("../../modules/post/PostModel");

module.exports = new GraphQLObjectType({
  name: "Query",
  description: "The root of all queries",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, __, context) => {
        if (context.user) {
          return await UserModel.find({});
        }

        return null;
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: async (_, { id }, context) => {
        if (context.user) {
          return await UserModel.findOne({ _id: id });
        }

        return null;
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_, __, context) => {
        if (context.user) {
          return await PostModel.find({}).populate("user");
        }

        return null;
      }
    }
  })
});
