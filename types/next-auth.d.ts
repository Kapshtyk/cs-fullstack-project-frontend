/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, {DefaultUser} from "next-auth";
import { JWT } from "next-auth/jwt";

import type { GetUserDto, User as UserType } from "@/entities/user";

declare module "next-auth" {
  interface User extends GetUserDto {
    id: number;
    refreshToken: string;
    accessToken: string;
  }
  
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: GetUserDto & {
      accessToken: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    firstName: string;
    lastName: string;
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: number;
    avatar: string;
    role: "Admin" | "User";
  }
}
