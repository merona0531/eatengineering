import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // 쿠키에서 토큰 삭제
        res.setHeader('Set-Cookie', serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0, // 즉시 만료
            sameSite: 'strict',
            path: '/',
        }));

        res.status(200).json({ message: 'Logout successful' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
