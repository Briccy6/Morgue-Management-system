import NextAuth, { type DefaultSession } from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      names: string;
      role: string;
    } & DefaultSession["user"];
  }
}
