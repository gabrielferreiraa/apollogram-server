const getUserByEmail = require("./user/getUserByEmail.js");
const getAllUsers = require("./user/getAllUsers.js");
const getAutenticatedUser = require("./user/getAutenticatedUser.js");
const getAllPosts = require("./post/getAllPosts.js");
const getLoggedUserPosts = require("./post/getLoggedUserPosts.js");

module.exports = {
  getUserByEmail,
  getAllUsers,
  getAutenticatedUser,
  getAllPosts,
  getLoggedUserPosts,
};
