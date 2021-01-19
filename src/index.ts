import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import schema from "graphql/schemas";
import { graphqlPort, dbUrl } from "config";
import { getUser } from "auth";
import context, { Context } from "context";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});
mongoose.connection.on("error", (err) =>
  console.log("connection error: ", err)
);
mongoose.connection.on("open", () =>
  console.log("The Mongoose connection is ready")
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
