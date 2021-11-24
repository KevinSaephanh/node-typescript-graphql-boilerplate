import { Field, InputType } from "type-graphql";

@InputType()
export class UserUpdateInput {
  @Field()
  username?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field()
  avatar?: string;
}
