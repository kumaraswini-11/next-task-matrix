import { db } from "./index";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
  try {
    // @typescript-eslint/no-explicit-any
    await migrate(db as any, {
      migrationsFolder: "src/db/migrations",
    });
    console.log("Migration completed.");
  } catch (error) {
    console.error("Error during migration:: ", error);
    process.exit(1);
  }
};

main();
