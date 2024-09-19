import { openDb } from '../../lib/db';
import bcrypt from 'bcrypt';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const db = await openDb();

        // 사용자 테이블이 존재하지 않으면 생성
        await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);

        // 사용자 이름이 이미 존재하는지 확인
        const existingUser = await db.get('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 데이터 삽입
        const statement = await db.prepare('INSERT INTO users (name, username, password) VALUES (?, ?, ?)');
        await statement.run(name, username, hashedPassword);
        await statement.finalize();

        return res.status(200).json({ message: '회원가입 성공' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
