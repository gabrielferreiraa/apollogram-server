import { join } from "path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import merge from "lodash.merge";

import resolvers from "../resolvers";

const schema = loadSchemaSync(join(__dirname, "./*.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

export default addResolversToSchema({
  schema,
  resolvers: merge({}, ...resolvers),
});
