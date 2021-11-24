import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createSchema } from "./utils/schema";
import config from "./utils/config";

const PORT = config.port;

const start = async () => {
  // await createConnection(config.db);

  const app = express();
  const server = new ApolloServer({
    schema: await createSchema(),
    typeDefs: [],
    context: ({ req, res }) => ({ req, res }),
  });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
};

start();
