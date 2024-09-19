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

            // 그룹 생성자와 멤버 조회
            const members = await db.all(`
                SELECT DISTINCT users.username, users.profile_image
                FROM group_members 
                JOIN users ON group_members.user_id = users.id 
                WHERE group_members.group_id = ?
                
                UNION
                
                SELECT DISTINCT users.username, users.profile_image
                FROM groups
                JOIN users ON groups.user_id = users.id
                WHERE groups.id = ?
            `, [id, id]);

            res.status(200).json({ members });
        } catch (error) {
            console.error('Error fetching group members:', error);
            res.status(500).json({ error: 'Failed to fetch group members' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
