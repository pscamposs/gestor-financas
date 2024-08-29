// next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      salary: number;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    salary: number;
  }
}
