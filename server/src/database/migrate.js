import mysql from 'mysql2/promise';
import fs    from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const SQL_FILE = path.join(__dirname, 'schema.sql');

(async () => {
  console.log(' Starting migration …');

  // Connect whith  a database
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST     || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,          
  });

  try {
    const sql = fs.readFileSync(SQL_FILE, 'utf8');
    console.log(` Loaded: ${SQL_FILE}`);

    await conn.query(sql);
    console.log(' Migration complete — hrms_hadiya_db is ready.');
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  } finally {
    await conn.end();
  }
})();
