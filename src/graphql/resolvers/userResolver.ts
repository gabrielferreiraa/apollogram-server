import { AuthenticationError } from "apollo-server";
import bcrypt from "bcrypt";

import { Resolvers } from "types";
import { Context } from "context";
import { generateToken } from "auth";

const resolvers: Resolvers<Context> = {
  User: {
    posts: async (parent, __, ctx) => {
      if (!ctx.me) throw new AuthenticationError("You are not authenticated");

      const { models } = ctx;
      return await models.post.find({ user: parent._id });
    },
  },
  Query: {
    users: async (_, __, ctx) => {
      if (!ctx.me) throw new AuthenticationError("You are not authenticated");

      const { models } = ctx;
      return await models.user.find().populate("post");
    },
    user: async (_, args, ctx) => {
      if (!ctx.me) throw new AuthenticationError("You are not authenticated");

      const { models } = ctx;
      return await models.user.findOne({ email: args.email });
    },
    me: async (_, __, { me }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      return me;
    },
  },
  Mutation: {
    async createUser(_, args, ctx) {
      const { models } = ctx;
      return new models.user(args).save();
    },
    updateUser: async (_, args, ctx) => {
      if (!ctx.me) throw new AuthenticationError("You are not authenticated");

      const {
        models,
        me: { _id },
      } = ctx;
      return await models.user.findOneAndUpdate({ _id }, args, { new: true });
    },
    async auth(_, args, ctx) {
      const { models } = ctx;
      const me = await models.user.findOne({
        email: args.email.toLowerCase(),
      });

      if (!me) throw new AuthenticationError("Invalid credentials");

      const isCorrectPassword = bcrypt.compareSync(args.password, me.password);

      if (!isCorrectPassword)
        throw new AuthenticationError("Invalid credentials");

      return { token: generateToken(me) };
    },
  },
};

export default resolvers;
