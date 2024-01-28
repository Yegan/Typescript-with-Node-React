import { open } from 'sqlite';
import * as sqlite3 from 'sqlite3';

export const initializeDatabase = async () => {
  const db = await open({
    filename: './appointments.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS staff_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT
    );

    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      start_time TEXT,
      end_time TEXT,
      staff_id INTEGER,
      client_id INTEGER,
      FOREIGN KEY (staff_id) REFERENCES staff_members(id),
      FOREIGN KEY (client_id) REFERENCES clients(id)
    );
  `);

  console.log('Database initialized');
  await db.run(`INSERT INTO staff_members (first_name, last_name) VALUES ('John', 'Doe')`);
  await db.run(`INSERT INTO staff_members (first_name, last_name) VALUES ('Jane', 'Smith')`);

  await db.run(`INSERT INTO clients (name) VALUES ('Client A')`);
  await db.run(`INSERT INTO clients (name) VALUES ('Client B')`);

  await db.run(`INSERT INTO appointments (start_time, end_time, staff_id, client_id) VALUES ('2024-01-28 10:00', '2024-01-28 11:00', 1, 1)`);
  await db.run(`INSERT INTO appointments (start_time, end_time, staff_id, client_id) VALUES ('2024-01-29 14:30', '2024-01-29 15:30', 2, 2)`);
  console.log('Mock data inserted');
};

 initializeDatabase();