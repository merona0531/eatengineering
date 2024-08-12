import { openDb } from '../../lib/db';

export default async function handler(req, res) {
    const db = await openDb();

    if (req.method === 'POST') {
        const { name, user_id } = req.body;

        console.log('Received group creation request:', { name, user_id }); // 로그 추가

        if (!name || !user_id) {
            return res.status(400).json({ message: 'Group name and user ID are required' });
        }

        try {
            const result = await db.run('INSERT INTO groups (name, user_id) VALUES (?, ?)', [name, user_id]);
            return res.status(201).json({ id: result.lastID, name, user_id });
        } catch (error) {
            console.error('Error inserting group:', error);
            return res.status(500).json({ message: 'Failed to save group' });
        }
    } else if (req.method === 'GET') {
        const groups = await db.all('SELECT * FROM groups');
        return res.status(200).json(groups);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
