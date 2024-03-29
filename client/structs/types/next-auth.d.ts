import { User as AuthUser } from "next-auth";

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  jwtToken: string;
}

interface CustomUser extends User {}

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface DefaultUser extends User {}
  interface User extends CustomUser {}
}
