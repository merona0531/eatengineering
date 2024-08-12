import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { openDb } from '../../lib/db';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const db = await openDb();
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // 로그인 성공 시 JWT 생성
        const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

        // JWT 토큰을 쿠키에 저장
        res.setHeader('Set-Cookie', serialize('token', token, {
            httpOnly: true, // 클라이언트 측에서 접근 불가
            secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서만 secure 플래그 사용
            maxAge: 3600, // 쿠키의 유효 기간 (초 단위)
            sameSite: 'strict', // CSRF 공격 방지
            path: '/', // 쿠키가 적용될 경로
        }));

        return res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
