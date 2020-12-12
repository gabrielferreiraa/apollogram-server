import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import schema from "./graphql/schemas";
import { graphqlPort, dbUrl } from "./graphql/config";
import { getUser } from "./graphql/auth";
import context, { Context } from "./context";

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
  schema,
  context: async ({ req }): Promise<Context> => {
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
