import { compare, hash } from "bcryptjs";

const encryptPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
};

const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await compare(plainPassword, hashedPassword);
};

export default {
  encryptPassword,
  comparePassword,
};
