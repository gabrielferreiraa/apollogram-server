const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const { jwtSecret } = require("./config");

async function getUser(token) {
  if (!token) return null;

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const user = await userModel.findOne({ _id: decodedToken.id });

    return user;
  } catch (e) {
    throw new AuthenticationError("Your session expired. Sign in again.");
  }
}

function generateToken(user) {
  return jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: "12h",
  });
}

module.exports = {
  getUser,
  generateToken,
};
