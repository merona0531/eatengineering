
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function openDb() {
    return open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
    });
}

export default async function handler(req, res) {
    const { id } = req.query;  // URL에서 group_id를 가져옴

    if (req.method === 'GET') {
        try {
            const db = await openDb();

            // 그룹 멤버 조회
            const members = await db.all(
                `SELECT users.username 
                 FROM group_members 
                 JOIN users ON group_members.user_id = users.id 
                 WHERE group_members.group_id = ?`,
                id
            );

            res.status(200).json({ members });
        } catch (error) {
            console.error('Error fetching group members:', error);
            res.status(500).json({ error: 'Failed to fetch group members' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
