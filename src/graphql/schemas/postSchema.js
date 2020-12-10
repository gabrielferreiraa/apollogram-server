const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
  }

  extend type Query {
    posts(user: ID): [Post!]!
  }

  extend type Mutation {
    createPost(title: String!, content: String!): Post
    deletePost(id: ID!): Post
  }
`;
