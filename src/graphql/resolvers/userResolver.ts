import { AuthenticationError } from "apollo-server";
import bcrypt from "bcrypt";

import { Resolvers } from "../../types";
import { Context } from "../../context";
import { generateToken } from "../auth";

const resolvers: Resolvers<Context> = {
  Query: {
    users: async (_: any, __: any, ctx) => {
      if (!ctx.me) throw new AuthenticationError("You are not authenticated");

      const { models } = ctx;
      return await models.user.find().populate("post");
    },
    user: async (_: any, args, ctx) => {
      if (!ctx.me) throw new AuthenticationError("You are not authenticated");

      const { models } = ctx;
      return await models.user.findOne({ email: args.email });
    },
    me: async (_: any, __: any, { me }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      return me;
    },
  },
  Mutation: {
    async createUser(_: any, args, ctx) {
      const { models } = ctx;
      return new models.user(args).save();
    },
    async auth(_: any, args, ctx) {
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
