import bcrypt from "bcrypt";

// Hashes a plain text password using Bcrypt. Argon2 will not work here, brcause next.js is a edge time.
export async function hashPassword(password: string): Promise<string> {
  if (!password) {
    throw new Error("Password is required for hashing.");
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    console.log("Password hashing failed.", error);
    throw new Error("Failed to hash password.");
  }
}

// Verifies a plain text password against a hashed password
export async function verifyPassword(
  hash: string,
  password: string,
): Promise<boolean> {
  if (!hash || !password) {
    throw new Error("verifyPassword - Missing keys");
  }

  try {
    return await bcrypt.compare(hash, password);
  } catch (error) {
    throw new Error("Failed to verify password.");
  }
}
