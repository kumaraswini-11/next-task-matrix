import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  check,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 255 }).unique(),
    role: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    authProvider: varchar("auth_provider", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    isActive: boolean("is_active").notNull().default(true),
    avatarUrl: varchar("avatar_url", { length: 500 }),
  },
  (table) => {
    return [
      {
        activeIdx: index("is_active_idx").on(table.isActive),
        emailIdx: uniqueIndex("email_idx").on(table.email),
        phoneIdx: uniqueIndex("phone_idx").on(table.phone),
      },
      check(
        "auth_provider_check",
        sql`${table.authProvider} IN ('google', 'github', 'credential')`,
      ),
    ];
  },
);
