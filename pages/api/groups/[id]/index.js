import { openDb } from '../../../../lib/db';

export default async function handler(req, res) {
    const db = await openDb();
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            // 그룹 정보 가져오기
            const group = await db.get('SELECT * FROM groups WHERE id = ?', id);

            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }

            // 그룹에 속한 블로그 데이터 가져오기
            const blogs = await db.all('SELECT * FROM blogs WHERE group_id = ?', id);

            // 그룹 정보와 블로그 데이터를 함께 반환
            res.status(200).json({ group, blogs });
        } catch (error) {
            console.error('Error fetching group:', error);
            res.status(500).json({ message: 'Failed to fetch group data' });
        }
    } else if (req.method === 'DELETE') {
        // DELETE 요청 처리 로직
        try {
            const result = await db.run('DELETE FROM groups WHERE id = ?', id);

            if (result.changes === 0) {
                return res.status(404).json({ message: 'Group not found' });
            }

            res.status(200).json({ message: 'Group deleted successfully' });
        } catch (error) {
            console.error('Error deleting group:', error);
            res.status(500).json({ message: 'Failed to delete group' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
