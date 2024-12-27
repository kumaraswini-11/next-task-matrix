import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { sql } from "drizzle-orm";

import { db } from "./db";
import { usersTable } from "./db/schema";
import { verifyPassword } from "./lib/password";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // If the environment variables are named following the standard format, such as AUTH_[PROVIDER]_ID and AUTH_[PROVIDER]_SECRET, Auth.js will automatically detect them for any "OAuth", allowing you to simply use Google() for configuration. However, even though I’m using the correct naming convention, I’m manually specifying them for clarity and consistency, so I can easily follow this approach in the future.
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),

    // It deals with the values what you want to take form user
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        // email: { label: "Email", type: "email", placeholder: "Enter email" },
        // password: { label: "Password", type: "password" },
        email: {},
        password: {},
      },

      // It deals with the logic, that how you will kown it a valid user. whatever we retur form here will go to the "callback" automatically
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          // throw new Error("Invalid credentials");
          throw new InvalidLoginError();
        }

        try {
          // Query the database for the user
          const user = await db
            .select({
              id: usersTable.id,
              email: usersTable.email,
              role: usersTable.role,
              password: usersTable.password,
            })
            .from(usersTable)
            // .where(eq(usersTable.email, credentials.email))
            .where(sql`${usersTable.email} = ${credentials?.email}`)
            .then((rows) => rows[0]); // Drizzle queries return an array; pick the first record

          if (!user) {
            throw new Error("No user found with this email.");
          }

          // Verify the password
          const isValid = await verifyPassword(
            user.password,
            credentials?.password as string,
          );
          if (!isValid) {
            throw new Error("Invalid password");
          }

          // Return the user details in tokenize format to session, witch we extracting form session token in callback
          return {
            id: user?.id.toString(),
            email: user?.email,
            role: user?.role,
          } as any;
        } catch (error) {
          console.log("Auth Error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    // Auth.js bydefalu follows the session based startegy. but i wanted to use jswt based statergy, as it is esier to manipualte and jwt tokens are stateless. so i wwanted all the dat form session go to jwt.
    // generally, session data stored on the the server-side but jwt's data stoted on the client side.
    async session({ session, token }) {
      session.user.id = token?.id as string;
      session.user.role = token?.role as string;

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        token.role = user?.role;
      }

      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
});
