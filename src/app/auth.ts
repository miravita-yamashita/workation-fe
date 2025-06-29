import NextAuth, { DefaultSession, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { genericRequest } from "@/lib/generic-action";
import { AdminLoginResponseType } from "@/components/admin/login";

export class LoginAPIError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.name = message;
  }
}

declare module "next-auth" {
  export interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    isAdmin?: boolean;
    avatar?: string | null;
    accessToken?: string | null;
    errorMessage?: string | null;
  }
  interface Session {
    user: {
      accessToken: string | undefined | null;
      errorMessage: string | undefined | null;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
        keepMeLoggedIn: { type: "boolean" },
        isAdmin: { type: "boolean" },
      },
      authorize: async (credentials): Promise<User | null> => {
        const payload = {
          email: credentials.username,
          password: credentials.password,
          remember_me: credentials.keepMeLoggedIn === "true",
        };

        const isAdmin = credentials?.isAdmin === "true";

        // Call Actual API to login
        const response = await genericRequest({
          method: "POST",
          path: "/login",
          isAdminPath: isAdmin, // Currently this no general user login
          options: {
            cache: "no-store",
            body: JSON.stringify(payload),
          },
        });

        const data: AdminLoginResponseType = await response.json();

        // Handle invalid credentials and pass the error message to the UI
        if (data.success !== true) {
          throw new LoginAPIError(data.message);
        }

        const { access_token, user } = data.data;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken: access_token,
          role: user.role,
          isAdmin: user.isAdmin,
          avatar: user.avatar?.url || "",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.isAdmin = user.isAdmin;
        token.errorMessage = user.errorMessage;
        token.avatar = user.avatar;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.accessToken = token.accessToken as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      session.user.isAdmin = token.isAdmin as boolean;
      session.user.avatar = token.avatar as string;

      return { ...session };
    },
  },
  session: {
    maxAge: 60 * 60 * 24 * 365 * 10, // 10 years in seconds
  },
});
