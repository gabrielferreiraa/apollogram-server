const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: String!
    name: String!
    email: String!
    picture: String
  }

  type Query {
    users: [User]
    user(email: String!): User
  }
`;
