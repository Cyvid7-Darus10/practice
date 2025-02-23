import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { readFile } from "fs/promises";
import { join } from "path";

/**
 * Opens a connection to the SQLite database, initializes the schema,
 * and returns the database instance.
 *
 * @returns A promise that resolves to the SQLite database instance.
 */
export async function connectDB() {
  // Open the database using the sqlite package wrapper for a better Promise-based API.
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Read and execute the SQL schema from food.sql
  try {
    const schemaPath = join(__dirname, "food.sql");
    const schema = await readFile(schemaPath, "utf-8");
    await db.exec(schema);
    console.log("Database schema initialized successfully.");
  } catch (error) {
    console.error("Error initializing database schema:", error);
  }

  console.log("Connected to SQLite database.");
  return db;
}
