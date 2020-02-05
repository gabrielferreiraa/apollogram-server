const jwt = require("jsonwebtoken");
const UserModel = require("../modules/user/UserModel");
const { jwtSecret } = require("./config");

async function getUser(token) {
  if (!token) return { user: null };

  try {
    const decodedToken = jwt.verify(token.substring(4), jwtSecret);

    const user = await UserModel.findOne({ _id: decodedToken.id });

    return {
      user
    };
  } catch (err) {
    return { user: null };
  }
}

function generateToken(user) {
  return `JWT ${jwt.sign({ id: user._id }, jwtSecret)}`;
}

module.exports = {
  getUser,
  generateToken
};
