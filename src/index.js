const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const schemas = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");
const { graphqlPort, dbUrl } = require("./graphql/config");
const { getUser } = require("./graphql/auth");
const userModel = require("./models/userModel");
const postModel = require("./models/postModel");

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.log("Some problem with the connection " + err);
    } else {
      console.log("The Mongoose connection is ready");
    }
  }
);

const server = new ApolloServer({
  resolvers,
  typeDefs: schemas,
  context: async ({ req }) => {
    const context = {
      models: {
        user: userModel,
        post: postModel,
      },
    };

    const token = req.headers.authorization;

    if (!token) return context;

    const me = await getUser(token);

    return {
      ...context,
      me,
    };
  },
});

server.listen(graphqlPort).then(({ url }) => {
  console.log("##########################################################");
  console.log(`#####  🚀  Server ready at ${url}    #####`);
  console.log("##########################################################\n");
});
