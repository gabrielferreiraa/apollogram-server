const { GraphQLSchema } = require("graphql");
const QueryType = require("./QueryType");
const MutationType = require("./MutationType");

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
