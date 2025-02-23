import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open a connection to a SQLite database file.
// You can also use ':memory:' to use an in-memory database.
export async function connectDB() {
  // Open the database using the sqlite package wrapper for a better Promise-based API.
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Optionally, create a sample table if it doesn't exist.
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE
    );
  `);

  console.log("Connected to SQLite database.");
  return db;
}
