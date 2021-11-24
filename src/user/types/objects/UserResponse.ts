import { Field, InputType } from "type-graphql";
import { User } from "../../entity/User";

@InputType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}
