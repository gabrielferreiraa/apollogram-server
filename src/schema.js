const { GraphQLSchema } = require("graphql");
const QueryType = require("./graphql/type/QueryType");
const MutationType = require("./graphql/type/MutationType");

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
