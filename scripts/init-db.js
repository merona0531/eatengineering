const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function initializeDb() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
    });

    // Users 테이블 생성
    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

    // Groups 테이블 생성
    await db.exec(`
    CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

    console.log('Database initialized and tables created.');
}

initializeDb().catch(console.error);
