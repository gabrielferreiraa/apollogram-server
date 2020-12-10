const { gql } = require("apollo-server");
const userSchema = require("./userSchema");
const postSchema = require("./postSchema");

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema, postSchema];
