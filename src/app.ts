import express, { Application, Request, Response } from 'express';
import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import {initializeDatabase} from '../src/db-init'

const app: Application = express();
const PORT = process.env.PORT || 3000;

export default app;

app.use(express.json());

const dbPromise = open({
  filename: './appointments.db',
  driver: sqlite3.Database,
});

app.get('/staff-members', async (req: Request, res: Response) => {
  const db = await dbPromise;
  const staffMembers = await db.all('SELECT * FROM staff_members');
  res.json(staffMembers);
});

app.get('/clients', async (req: Request, res: Response) => {
  const db = await dbPromise;
  const clients = await db.all('SELECT * FROM clients');
  console.log('clients:', clients);
  res.json(clients);
});

app.get('/appointments', async (req: Request, res: Response) => {
  try {
    const db = await dbPromise;
    const query = 'SELECT id, start_time, end_time, staff_id, client_id FROM appointments';
    console.log('SQL Query:', query);
    const rawAppointments = await db.all(query);
    console.log('Raw Appointments:', rawAppointments);
    res.json(rawAppointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/appointments', async (req: Request, res: Response) => {
  try {
    const { startTime, endTime, staffId, clientId } = req.body;
    const db = await dbPromise;
    await db.run(
      'INSERT INTO appointments (start_time, end_time, staff_id, client_id) VALUES (?, ?, ?, ?)',
      [startTime, endTime, staffId, clientId]
    );
    res.json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

initializeDatabase();


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});