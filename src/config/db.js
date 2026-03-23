import pool from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pool;

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres', // Connect to default 'postgres' database first to check/create target DB
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


const checkDbConnection = async () => {
  try {
    const res = await db.query('SELECT 1 FROM pg_database WHERE datname = $1', [process.env.DB_NAME]);
    if (res.rowCount > 0) {
      console.log('Database exists and is accessible');
    } else {
      console.log('Database does not exist. Creating...');
      await db.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
      console.log('Database created successfully');
    }
  } catch (err) {
    console.error('Error checking or creating database:', err);
  } finally {
    await db.end();
  }
};


export default db;
export { checkDbConnection };