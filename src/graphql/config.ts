require("dotenv").config();

const ENV = process.env;

const jwtSecret = ENV.JWT_KEY || "jwt_secret";
const graphqlPort = ENV.PORT || 9000;

const mLabUser = ENV.MLAB_USER;
const mLabPass = ENV.MLAB_PASSWORD;

const dbUrl = `mongodb+srv://${mLabUser}:${mLabPass}@cluster0.3pvt3.mongodb.net/<dbname>?retryWrites=true&w=majority`;

export { jwtSecret, graphqlPort, dbUrl };
