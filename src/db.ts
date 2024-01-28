import { open, Database } from 'sqlite';
import * as sqlite3 from 'sqlite3';

let db: Database | null = null;

export const connectDatabase = async () => {
  db = await open({
    filename: './appointments.db',
    driver: sqlite3.Database,
  });

  return db;
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDatabase first.');
  }
  return db;
};