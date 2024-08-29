import mysql from "mysql2/promise";

let pool: mysql.Pool;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
    });
  }
  return pool.getConnection();
};

const executeQuery = async (query: string, params?: any[]): Promise<any> => {
  const connection = await getConnection();
  try {
    return await connection.execute(query, params);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  } finally {
    connection.release();
  }
};

export default executeQuery;
