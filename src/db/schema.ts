// import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";

const timestamps = {
  created_at: t.timestamp().defaultNow().notNull(),
  updated_at: t.timestamp(),
  // deleted_at: t.timestamp(),
};

export const rolesEnum = pgEnum("roles_enum", [
  "admin",
  "member",
  "manager",
  "client",
]);

export const authProviderEnum = pgEnum("auth_providers_enum", [
  "google",
  "github",
  "credential",
]);

export const usersTable = table(
  "users",
  {
    id: t.serial().primaryKey(),
    name: t.varchar({ length: 255 }).notNull(),
    email: t.varchar({ length: 255 }).notNull().unique(),
    phone: t.varchar({ length: 255 }).unique(),
    avatarUrl: t.varchar("avatar_url", { length: 500 }),
    password: t.varchar({ length: 255 }).notNull(),
    authProvider: authProviderEnum("auth_provider").default("credential"),
    role: rolesEnum().default("member"),
    isActive: t.boolean("is_active").default(true),
    emailVerified: t.timestamp("email_verified", { mode: "date" }),
    ...timestamps,
  },
  (table) => {
    return [
      {
        emailIndex: t.uniqueIndex("email_idx").on(table.email),
        phoneIndex: t.uniqueIndex("phone_idx").on(table.phone),
        isActiveIndex: t.index("is_active_idx").on(table.isActive),
      },
    ];
  },
);
