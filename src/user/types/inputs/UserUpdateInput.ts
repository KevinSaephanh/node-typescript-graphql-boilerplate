import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../../utils/isEmailAlreadyExist";

@InputType()
export class UserUpdateInput {
  @Field()
  @Length(3, 25)
  username?: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email is already in use" })
  email?: string;

  @Field()
  @Length(7, 255)
  password?: string;

  @Field()
  avatar?: string;
}
