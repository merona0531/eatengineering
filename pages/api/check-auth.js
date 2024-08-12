import jwt from 'jsonwebtoken';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// JWT 비밀 키
const JWT_SECRET = 'jwt 비밀키';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // 쿠키에서 JWT 토큰 가져오기
            const token = req.cookies.token;

            if (!token) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            // JWT 검증
            const decoded = jwt.verify(token, JWT_SECRET);
            const userId = decoded.id;

            const db = await open({
                filename: './database.sqlite',
                driver: sqlite3.Database,
            });

            // 사용자 정보 반환
            const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
            res.status(200).json({ user });
        } catch (error) {
            console.error('Error checking authentication:', error);
            res.status(500).json({ message: 'Failed to check authentication' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
