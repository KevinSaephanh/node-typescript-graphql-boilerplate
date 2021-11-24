import { UserInput } from "../inputs/UserInput";

export const validateRegister = (input: UserInput) => {
  const { username, email, password } = input;
  return true;
};
