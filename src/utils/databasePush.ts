import { Pool } from "pg";

// Function to push schema to remote database
export async function pushSchemaToRemoteDatabase(
  schema: string,
  connectionConfig: {
    host: string;
    database: string;
    port: number;
    user: string;
    password: string;
    ssl: boolean;
  },
): Promise<{ success: boolean; message: string }> {
  // This function can only run in a Node.js environment
  if (typeof window !== "undefined") {
    return {
      success: false,
      message: "Database push can only be executed in a Node.js environment",
    };
  }

  let pool: Pool | null = null;

  try {
    // Create a connection pool
    pool = new Pool({
      host: connectionConfig.host,
      database: connectionConfig.database,
      port: connectionConfig.port,
      user: connectionConfig.user,
      password: connectionConfig.password,
      ssl: connectionConfig.ssl ? { rejectUnauthorized: false } : false,
    });

    // Test the connection
    const client = await pool.connect();
    console.log("Connected to remote database");

    // Execute the schema
    await client.query(schema);
    console.log("Schema executed successfully");

    client.release();

    return {
      success: true,
      message: "Database schema successfully pushed to remote server",
    };
  } catch (error) {
    console.error("Error pushing schema to remote database:", error);
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : String(error)}`,
    };
  } finally {
    if (pool) {
      pool.end();
    }
  }
}
