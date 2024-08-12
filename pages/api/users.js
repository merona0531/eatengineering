import { openDb } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const db = await openDb();
        const users = await db.all('SELECT * FROM users');
        return res.status(200).json(users);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
