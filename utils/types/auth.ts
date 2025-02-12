import type { UserRoleEnum } from "@prisma/client";
import type { IUserBasicInfo } from ".";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  names: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  location: string;
}

export interface ILoginResponse {
  token: string;
  user: Partial<IUserBasicInfo>;
}
