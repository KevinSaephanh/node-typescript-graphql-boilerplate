import { buildSchema } from "type-graphql";
import { UserResolver } from "../user/UserResolver";

export const createSchema = () => {
  return buildSchema({
    resolvers: [UserResolver],
    validate: false,
    authChecker: ({ context: { req } }) => !!req.session.userId,
  });
};
