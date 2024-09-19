import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import jwt from 'jsonwebtoken';

// JWT 비밀 키
const JWT_SECRET = '26fd3f027c9d9fe3dfcebab38afa893141a51a9f5e0bb46f36058f35fff32eab45da434b95c1ab7afb1d66045ecd7657f9639d24967f349715b9011878f306c3';

// API에서 기본 bodyParser를 비활성화
export const config = {
    api: {
        bodyParser: false,
    },
};

// 업로드 디렉토리 설정
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// 폴더가 존재하지 않으면 생성
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 업로드 및 DB 저장 핸들러
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // 쿠키에서 JWT 토큰 가져오기
            const token = req.cookies.token;

            if (!token) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            // JWT 검증
            const decoded = jwt.verify(token, JWT_SECRET);
            const userId = decoded.id;

            // formidable을 사용해 파일 업로드 처리
            const form = new IncomingForm({
                uploadDir,
                keepExtensions: true,
                filename: (name, ext, part, form) => `${Date.now()}${path.extname(part.originalFilename)}`,
            });

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                const file = files.file[0];
                if (file) {
                    const filePath = `/uploads/${path.basename(file.filepath)}`;

                    // 데이터베이스에 저장
                    const db = await open({
                        filename: './database.sqlite',
                        driver: sqlite3.Database,
                    });

                    // 해당 사용자 프로필 이미지 경로 업데이트
                    await db.run('UPDATE users SET profile_image = ? WHERE id = ?', [filePath, userId]);

                    // 이미지 URL 반환
                    res.status(200).json({ url: filePath });
                } else {
                    res.status(400).json({ error: 'No file uploaded' });
                }
            });
        } catch (error) {
            console.error('Error during profile image upload:', error);
            res.status(500).json({ message: 'Failed to upload profile image' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
