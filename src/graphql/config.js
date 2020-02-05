require("dotenv").config();

const ENV = process.env;

const jwtSecret = ENV.JWT_KEY || "jwt_secret";
const graphqlPort = ENV.GRAPHQL_PORT || 4000;

const mLabUser = ENV.MLAB_USER;
const mLabPass = ENV.MLAB_PASSWORD;

const dbUrl = `mongodb://${mLabUser}:${mLabPass}@ds041198.mlab.com:41198/timeline-graphql`;

module.exports = { jwtSecret, graphqlPort, dbUrl };
