import { openDb } from '../../../../lib/db';

export default async function handler(req, res) {
    const db = await openDb();
    const { id } = req.query;  // 그룹 ID

    if (req.method === 'GET') {
        try {
            const blogs = await db.all(
                'SELECT blogs.*, users.name AS author FROM blogs JOIN users ON blogs.user_id = users.id WHERE group_id = ?',
                id
            );

            res.status(200).json(blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            res.status(500).json({ message: 'Failed to fetch blogs' });
        }
    } else if (req.method === 'POST') {
        try {
            const { title, content, userId } = req.body;

            const result = await db.run(
                'INSERT INTO blogs (title, content, user_id, group_id) VALUES (?, ?, ?, ?)',
                [title, content, userId, id]
            );

            res.status(201).json({ id: result.lastID, title, content, user_id: userId, group_id: id });
        } catch (error) {
            console.error('Error creating blog:', error);
            res.status(500).json({ message: 'Failed to create blog' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
