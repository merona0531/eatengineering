import { openDb } from '../../../../lib/db';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

// bodyParser 비활성화
export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function handler(req, res) {
    const db = await openDb();
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const group = await db.get('SELECT * FROM groups WHERE id = ?', id);
            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }
            const blogs = await db.all('SELECT * FROM blogs WHERE group_id = ?', id);
            res.status(200).json({ group, blogs });
        } catch (error) {
            console.error('Error fetching group:', error);
            res.status(500).json({ message: 'Failed to fetch group data' });
        }
    } else if (req.method === 'POST') {
        const form = new IncomingForm({
            uploadDir,
            keepExtensions: true,
            filename: (name, ext, part) => `${Date.now()}${path.extname(part.originalFilename)}`,
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const file = files.file[0];
            if (file) {
                const filePath = `/uploads/${path.basename(file.filepath)}`;

                try {
                    await db.run('UPDATE groups SET image = ? WHERE id = ?', filePath, id);
                    res.status(200).json({ url: filePath });
                } catch (error) {
                    console.error('그룹 이미지 업데이트 오류:', error);
                    res.status(500).json({ error: '그룹 이미지 업데이트 실패' });
                }
            } else {
                res.status(400).json({ error: '업로드된 파일이 없습니다' });
            }
        });
    } else if (req.method === 'DELETE') {
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
