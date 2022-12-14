import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
// import { resolvers } from "../../../graphql/resolvers";
import { schema } from "../../../graphql/schema";
import { createContext } from "../../../graphql/context";

const server = new ApolloServer({ schema });

export default startServerAndCreateNextHandler(server, {
  context: createContext,
});
