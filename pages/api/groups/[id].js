import { openDb } from '../../../lib/db'; // 데이터베이스 연결 유틸리티

export default async function handler(req, res) {
    const db = await openDb(); // 데이터베이스 연결

    if (req.method === 'DELETE') {
        const { id } = req.query; // URL 파라미터에서 그룹 ID 가져오기

        try {
            const result = await db.run('DELETE FROM groups WHERE id = ?', id); // 그룹 삭제 쿼리 실행

            if (result.changes === 0) {
                return res.status(404).json({ message: 'Group not found' }); // 그룹이 존재하지 않으면 404 오류
            }

            res.status(200).json({ message: 'Group deleted successfully' }); // 성공적으로 삭제되면 200 응답
        } catch (error) {
            console.error('Error deleting group:', error);
            res.status(500).json({ message: 'Failed to delete group' }); // 서버 오류 시 500 응답
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' }); // DELETE 외의 메서드 사용 시 405 응답
    }
}
