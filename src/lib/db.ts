// Dynamically import pg in Node.js environment and use mock in browser

// Import the mock implementation
import {
  MockPool,
  query as mockQuery,
  testConnection as mockTestConnection,
  saveData as mockSaveData,
} from "./mockDb";

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined";

// Define types for our database interface
type QueryResult = {
  rows: any[];
  rowCount?: number;
};

type PoolClient = {
  query: (text: string, params?: any[]) => Promise<QueryResult>;
  release: () => void;
};

type Pool = {
  connect: () => Promise<PoolClient>;
  query: (text: string, params?: any[]) => Promise<QueryResult>;
};

// Use the mock implementation in browser environment
let pool: Pool;

if (isBrowser) {
  console.log("Using mock database implementation in browser environment");
  pool = new MockPool() as unknown as Pool;
} else {
  try {
    // Only import pg in Node.js environment
    // This will be skipped in browser environments
    const { Pool } = require("pg");

    // Create a connection pool
    pool = new Pool({
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      host: process.env.POSTGRES_HOST || "localhost",
      port: parseInt(process.env.POSTGRES_PORT || "5432"),
      database: process.env.POSTGRES_DB || "smkscheduler",
      ssl:
        process.env.POSTGRES_SSL === "true"
          ? { rejectUnauthorized: false }
          : false,
    });
  } catch (error) {
    console.error(
      "Failed to import pg module, falling back to mock implementation",
      error,
    );
    pool = new MockPool() as unknown as Pool;
  }
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  if (isBrowser) {
    return mockTestConnection();
  }

  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    client.release();
    console.log("Database connection successful:", result.rows[0]);
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

// Execute a query with optional parameters
export async function query(text: string, params?: any[]) {
  if (isBrowser) {
    return mockQuery(text, params);
  }

  try {
    const client = await pool.connect();
    const result = await client.query(text, params);
    client.release();
    return result;
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
}

// Save data to database
export async function saveData(table: string, data: any) {
  if (isBrowser) {
    return mockSaveData(table, data);
  }

  // Generate column names and placeholders for the query
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");
  const values = Object.values(data);

  try {
    const result = await query(
      `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`,
      values,
    );
    return result.rows[0];
  } catch (error) {
    console.error(`Error saving data to ${table}:`, error);
    throw error;
  }
}

// Export a default object for compatibility
export default { query, testConnection, saveData };
