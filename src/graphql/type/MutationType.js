const { GraphQLObjectType, GraphQLString } = require("graphql");
const bcrypt = require("bcrypt");

const UserType = require("../../modules/user/UserType");
const UserModel = require("../../modules/user/UserModel");

const PostType = require("../../modules/post/PostType");
const PostModel = require("../../modules/post/PostModel");

const AuthType = require("../../modules/auth/AuthType");

const { generateToken } = require("../auth");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  description: "The root of all mutations",
  fields: () => ({
    registerUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        const user = new UserModel({
          name: args.name,
          email: args.email,
          password: args.password
        });

        return user.save();
      }
    },
    createPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString }
      },
      resolve(_, args, context) {
        if (context.user) {
          const post = new PostModel({
            title: args.title,
            content: args.content,
            user: context.user
          });

          return post.save();
        }

        return null;
      }
    },
    login: {
      type: AuthType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (_, { email, password }) => {
        const user = await UserModel.findOne({
          email: email.toLowerCase()
        });

        if (!user) {
          return {
            token: null,
            error: "INVALID_EMAIL_PASSWORD"
          };
        }

        const isCorrectPassword = bcrypt.compareSync(password, user.password);

        if (!isCorrectPassword) {
          return {
            token: null,
            error: "INVALID_EMAIL_PASSWORD"
          };
        }

        return {
          token: generateToken(user),
          error: null
        };
      }
    }
  })
});
