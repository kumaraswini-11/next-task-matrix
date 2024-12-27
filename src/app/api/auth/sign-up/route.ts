import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";

import { usersTable } from "@/db/schema";
import { db } from "@/db";

// type NewUser = typeof usersTable.$inferInsert;

export async function POST(
  request: NextRequest & typeof usersTable.$inferInsert,
) {
  try {
    const { name, email, password, phone, avatarUrl, authProvider } =
      await request.json();

    // Validate input
    if (!name || !email || !password || !authProvider) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    // Check if the user already exists
    const existingUser = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(sql`${usersTable.email} = ${email}`);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 },
      );
    }

    // Insert the new user
    const newUser = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password,
        phone,
        avatarUrl,
        authProvider,
      })
      .returning({
        id: usersTable.id,
      });

    return NextResponse.json(
      { message: "User created successfully.", user: newUser },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to signup. Please try again." },
      { status: 500 },
    );
  }
}
