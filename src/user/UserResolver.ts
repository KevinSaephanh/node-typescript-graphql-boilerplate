import { hash } from "bcrypt";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import config from "../utils/config";
import { User } from "./entity/User";
import { UserInput } from "./types/inputs/UserInput";
import { UserUpdateInput } from "./types/inputs/UserUpdateInput";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User)
  userById(@Arg("id") id: string) {
    const user = User.findOne({ where: { id } });
    if (!user) throw new Error();
    return user;
  }

  @Query(() => User)
  userByUsername(@Arg("username") username: string) {
    const user = User.findOne({ where: { username } });
    if (!user) throw new Error();
    return user;
  }

  @Mutation(() => Boolean)
  async register(@Arg("input") input: UserInput) {
    const { username, email, password } = input;
    // const hashedPassword = await hash(password, config.auth.saltRounds);

    // if (!hashedPassword) throw new Error("Error hashing password");

    try {
      // await User.create({
      //   username,
      //   email,
      //   password: hashedPassword,
      // }).save();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => UserUpdateInput) input: UserUpdateInput
  ) {
    try {
      await User.update({ id }, input);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number) {
    try {
      await User.delete({ id });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
