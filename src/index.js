const Koa = require("koa");
const Router = require("koa-router");
const GraphQLHTTP = require('koa-graphql');
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser');
const http = require("http");
const mongoose = require("mongoose");

const schema = require('./schema');

mongoose.connect(
  "mongodb://gabrielferreira:pro14907@ds041198.mlab.com:41198/timeline-graphql",
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

const graphqlServer = GraphQLHTTP({
  schema,
  graphiql: true
});

router.all("/graphql", graphqlServer);

app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

const server = http.createServer(app.callback());

server.listen(4000, () => {
  console.log("##########################################################");
  console.log("#####               STARTING SERVER                  #####");
  console.log("##########################################################\n");
  console.log(`App running and listening on port 4000...`);
  console.log(`GraphQL Server is now running on http://localhost:4000/graphql`);
});
