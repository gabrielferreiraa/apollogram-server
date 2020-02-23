const Koa = require("koa");
const Router = require("koa-router");
const GraphQLHTTP = require("koa-graphql");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const http = require("http");
const mongoose = require("mongoose");
const koaPlayground = require('graphql-playground-middleware-koa').default;

const { graphqlPort, dbUrl } = require("./graphql/config");
const { getUser } = require("./graphql/auth");

const schema = require("./schema");

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true
  },
  err => {
    if (err) {
      console.log("Some problem with the connection " + err);
    } else {
      console.log("The Mongoose connection is ready");
    }
  }
);

const app = new Koa();
const router = new Router();

const graphqlSettingsPerReq = async req => {
  const { user } = await getUser(req.header.authorization);

  return {
    graphiql: true,
    schema,
    context: {
      user,
      req
    }
  };
};

const graphqlServer = GraphQLHTTP(graphqlSettingsPerReq);

router.post("/graphql", graphqlServer);
router.all("/playground", koaPlayground({
  endpoint: "/graphql"
}));

app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

const server = http.createServer(app.callback());

server.listen(4000, () => {
  console.log("##########################################################");
  console.log("#####               STARTING SERVER                  #####");
  console.log("##########################################################\n");
  console.log(`App running and listening on port ${graphqlPort}...`);
  console.log(
    `GraphQL Server is now running on http://localhost:${graphqlPort}/graphql`
  );
});
