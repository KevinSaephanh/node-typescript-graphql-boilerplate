import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createSchema } from "./utils/schema";
import { createConnection } from "typeorm";
import config from "./utils/config";

const { port } = config;

const start = async () => {
  await createConnection(config.db);

  const app = express();
  const server = new ApolloServer({
    schema: await createSchema(),
    typeDefs: [],
    context: ({ req, res }) => ({ req, res }),
  });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => console.log(`Server listening on port: ${port}`));
};

start();
