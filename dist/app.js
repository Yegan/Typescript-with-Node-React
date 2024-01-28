"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlite3 = __importStar(require("sqlite3"));
const sqlite_1 = require("sqlite");
const db_init_1 = require("../src/db-init");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
exports.default = app;
app.use(express_1.default.json());
const dbPromise = (0, sqlite_1.open)({
    filename: './appointments.db',
    driver: sqlite3.Database,
});
app.get('/staff-members', async (req, res) => {
    const db = await dbPromise;
    const staffMembers = await db.all('SELECT * FROM staff_members');
    res.json(staffMembers);
});
app.get('/clients', async (req, res) => {
    const db = await dbPromise;
    const clients = await db.all('SELECT * FROM clients');
    console.log('clients:', clients);
    res.json(clients);
});
app.get('/appointments', async (req, res) => {
    try {
        const db = await dbPromise;
        const query = 'SELECT id, start_time, end_time, staff_id, client_id FROM appointments';
        console.log('SQL Query:', query);
        const rawAppointments = await db.all(query);
        console.log('Raw Appointments:', rawAppointments);
        res.json(rawAppointments);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/appointments', async (req, res) => {
    try {
        const { startTime, endTime, staffId, clientId } = req.body;
        const db = await dbPromise;
        await db.run('INSERT INTO appointments (start_time, end_time, staff_id, client_id) VALUES (?, ?, ?, ?)', [startTime, endTime, staffId, clientId]);
        res.json({ message: 'Appointment created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
(0, db_init_1.initializeDatabase)();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
