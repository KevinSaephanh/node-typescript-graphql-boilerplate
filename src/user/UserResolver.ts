import { hash, compare } from "bcrypt";
import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types/MyContext";
import { User } from "./entity/User";
import { LoginInput } from "./types/inputs/LoginInput";
import { RegisterInput } from "./types/inputs/RegisterInput";
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
  async register(@Arg("input") input: RegisterInput): Promise<boolean> {
    const { username, email, password } = input;
    const hashedPassword = await hash(password, 12);

    try {
      await User.create({
        username,
        email,
        password: hashedPassword,
      }).save();

      // Send email here

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg("input") input: LoginInput, @Ctx() ctx: MyContext): Promise<User | null> {
    const { username, password } = input;
    const user = await User.findOne({ username });

    if (!user) return null;

    const isMatch = await compare(password, user.password);
    if (!isMatch) return null;

    if (!user.isActive) return null;

    ctx.req.session!.userId = user.id;
    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err: Error) => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        ctx.res.clearCookie("qid");
        return res(true);
      })
    );
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => UserUpdateInput) input: UserUpdateInput
  ): Promise<boolean> {
    try {
      await User.update({ id }, input);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
    try {
      await User.delete({ id });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
