const ENV = process.env;

const jwtSecret = ENV.JWT_KEY || "jwt_secret";
const graphqlPort = ENV.GRAPHQL_PORT || 4000;

module.exports = { jwtSecret, graphqlPort };
