import { openDb } from '../../../../lib/db';

export default async function handler(req, res) {
    const db = await openDb();
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const blog = await db.get('SELECT * FROM blogs WHERE id = ?', id);

            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }

            res.status(200).json(blog);
        } catch (error) {
            console.error('Error fetching blog:', error);
            res.status(500).json({ message: 'Failed to fetch blog' });
        }
    } else if (req.method === 'POST') {
        const { title, content, userId } = req.body;

        try {
            const result = await db.run(
                'INSERT INTO blogs (title, content, userId, groupId) VALUES (?, ?, ?, ?)',
                [title, content, userId, id]
            );

            res.status(201).json({ message: 'Blog created successfully', id: result.lastID });
        } catch (error) {
            console.error('Error creating blog:', error);
            res.status(500).json({ message: 'Failed to create blog' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const result = await db.run('DELETE FROM blogs WHERE id = ?', id);

            if (result.changes === 0) {
                return res.status(404).json({ message: 'Blog not found' });
            }

            res.status(200).json({ message: 'Blog deleted successfully' });
        } catch (error) {
            console.error('Error deleting blog:', error);
            res.status(500).json({ message: 'Failed to delete blog' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
