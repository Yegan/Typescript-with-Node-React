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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const sqlite_1 = require("sqlite");
const sqlite3 = __importStar(require("sqlite3"));
const initializeDatabase = async () => {
    const db = await (0, sqlite_1.open)({
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
exports.initializeDatabase = initializeDatabase;
(0, exports.initializeDatabase)();
