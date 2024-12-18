import { db } from "./index";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
  try {
    // @ts-ignore
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
