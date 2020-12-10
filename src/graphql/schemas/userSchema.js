const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    picture: String
  }

  extend type Query {
    users: [User!]!
    user(email: String!): User
  }

  type Token {
    token: String!
  }

  extend type Mutation {
    createUser(
      name: String!
      password: String!
      email: String!
      picture: String
    ): User
    auth(email: String!, password: String!): Token
  }
`;
