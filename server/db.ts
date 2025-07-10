import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";
import dotenv from 'dotenv';

dotenv.config();

const sqlite = new Database(process.env.DATABASE_URL?.replace('file:', '') || './database.db');

export const db = drizzle(sqlite, { schema });
