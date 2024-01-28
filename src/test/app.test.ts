// import request from 'supertest';
// import { connectDatabase, getDatabase } from '../db';
// import app from '../app';


// beforeAll(async () => {
//   await connectDatabase();
// });

// afterAll(async () => {
//   // Close the database connection after all tests
//   const db = getDatabase();
//   db.close();
// });

// describe('GET / ', () => {
//   it('responds with 200', async () => {
//     const response = await request(app).get('/');
//     expect(response.statusCode).toBe(200);
//   });
// });