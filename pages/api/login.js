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
        const token = jwt.sign({ id: user.id, username: user.username }, '26fd3f027c9d9fe3dfcebab38afa893141a51a9f5e0bb46f36058f35fff32eab45da434b95c1ab7afb1d66045ecd7657f9639d24967f349715b9011878f306c3', { expiresIn: '1h' });

        // JWT 토큰을 쿠키에 저장
        res.setHeader('Set-Cookie', serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600,
            sameSite: 'strict',
            path: '/',
        }));

        return res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username } });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
