const { GraphQLObjectType, GraphQLString } = require("graphql");

const UserType = require("../user/UserType");

module.exports = new GraphQLObjectType({
  name: "Post",
  description: "Post data",
  fields: () => ({
    id: { type: GraphQLString, resolve: post => post._id },
    title: { type: GraphQLString, resolve: post => post.title },
    content: { type: GraphQLString, resolve: post => post.content },
    user: { type: UserType  }
  })
});
