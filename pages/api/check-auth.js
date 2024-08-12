import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        try {
            // JWT 토큰 검증
            const decoded = jwt.verify(token, 'your_jwt_secret');
            return res.status(200).json({ message: 'Authenticated', user: decoded });
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
