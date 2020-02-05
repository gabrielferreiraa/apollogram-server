const { GraphQLString, GraphQLNonNull } = require("graphql");
const bcrypt = require("bcrypt");

const AuthType = require("../../../modules/auth/AuthType");
const UserModel = require("../../../modules/user/UserModel");
const { generateToken } = require("../../auth");

const loginFail = () => ({ token: null, error: "INVALID_EMAIL_PASSWORD" });
const loginSuccess = user => ({ token: generateToken(user), error: null });

module.exports = {
  type: AuthType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, { email, password }) => {
    const user = await UserModel.findOne({
      email: email.toLowerCase()
    });

    if (!user) return loginFail();

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (isCorrectPassword) return loginSuccess(user);

    return loginFail();
  }
};
