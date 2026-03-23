import pool from 'pg';
import dotenv from 'dotenv';
import { createUsersTable, createProjectsTable, createLogsTable, createProjectMembersTable,createIndexes } from '../data/dbSchema.js';

dotenv.config();

const { Pool } = pool;

const initdb = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres', // Connect to default 'postgres' database first to check/create target DB
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


const checkDbConnection = async () => {
  try {
    const res = await initdb.query('SELECT 1 FROM pg_database WHERE datname = $1', [process.env.DB_NAME]);
    if (res.rowCount > 0) {
      console.log('Database exists and is accessible');
    } else {
      console.log('Database does not exist. Creating...');
      await initdb.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
      console.log('Database created successfully');
    }
  } catch (err) {
    console.error('Error checking or creating database:', err);
  } finally {
    await initdb.end();
  }
};

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const initSchema = async () => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    console.log('Initializing database schema...');

    await client.query(createUsersTable);
    console.log('Users table created successfully');

    await client.query(createProjectsTable);
    console.log('Projects table created successfully');

    await client.query(createProjectMembersTable);
    console.log('Project_members table created successfully');

    await client.query(createLogsTable);
    console.log('Logs table created successfully');

    await client.query(createIndexes);
    console.log('Indexes created successfully');

    await client.query('COMMIT');
    console.log('Database schema initialized successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error initializing schema... Rolling back:', err);
  } finally {
    client.release();
  }
};

export default db;
export { checkDbConnection, initSchema };