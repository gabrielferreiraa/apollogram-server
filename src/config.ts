require("dotenv").config();

const ENV = process.env;

const jwtSecret = ENV.JWT_KEY || "jwt_secret";
const graphqlPort = ENV.SERVER_PORT || 9000;

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = ENV;

const dbUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

export { jwtSecret, graphqlPort, dbUrl };
