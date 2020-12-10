const { AuthenticationError } = require("apollo-server");
const bcrypt = require("bcrypt");

const { generateToken } = require("../auth");

module.exports = {
  Query: {
    users: async (_, __, { me, models: { user } }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      return await user.find().populate("post");
    },
    user: async (_, { email }, { me, models: { user } }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      return await user.findOne({ email });
    },
  },
  Mutation: {
    createUser: async (
      _,
      { name, password, email, picture },
      { models: { user } }
    ) => {
      return new user({
        name,
        email,
        password,
        picture,
      }).save();
    },
    auth: async (_, { email, password }, { models: { user } }) => {
      const me = await user.findOne({
        email: email.toLowerCase(),
      });

      if (!me) throw new AuthenticationError("Invalid credentials");

      const isCorrectPassword = bcrypt.compareSync(password, me.password);

      if (!isCorrectPassword)
        throw new AuthenticationError("Invalid credentials");

      return { token: generateToken(me) };
    },
  },
};
