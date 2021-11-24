import { Field } from "type-graphql";
import { User } from "../../../user/entity/User";

export class AuthResponse {
  @Field()
  token: string;

  @Field()
  user: User;
}
