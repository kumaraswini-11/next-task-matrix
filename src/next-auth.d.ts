import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context.
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      // password?: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    role: string;
    // password?: string;
  }
}
