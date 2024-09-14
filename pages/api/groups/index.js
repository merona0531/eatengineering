import jwt from 'jsonwebtoken';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// JWT 비밀 키
const JWT_SECRET = '26fd3f027c9d9fe3dfcebab38afa893141a51a9f5e0bb46f36058f35fff32eab45da434b95c1ab7afb1d66045ecd7657f9639d24967f349715b9011878f306c3';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // 쿠키에서 JWT 토큰 가져오기
            const token = req.cookies.token;

            if (!token) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            // JWT 검증
            const decoded = jwt.verify(token, JWT_SECRET);
            const username = decoded.username;

            const db = await open({
                filename: './database.sqlite',
                driver: sqlite3.Database,
            });

            // 사용자 ID 가져오기
            const user = await db.get('SELECT id FROM users WHERE username = ?', [username]);
            if (!user) return res.status(404).json({ message: 'User not found' });

            const userId = user.id;

            // 사용자가 생성한 그룹과 초대를 통해 가입한 그룹 조회 (이미지 포함)
            const groups = await db.all(`
                SELECT g.id, g.name, g.image
                FROM groups g
                LEFT JOIN group_members gm ON g.id = gm.group_id AND gm.user_id = ?
                WHERE g.user_id = ? OR gm.user_id IS NOT NULL
            `, [userId, userId]);

            res.status(200).json(groups);
        } catch (error) {
            console.error('Error fetching groups:', error);
            res.status(500).json({ message: 'Failed to fetch groups' });
        }
    } else if (req.method === 'POST') {
        try {
            // 쿠키에서 JWT 토큰 가져오기
            const token = req.cookies.token;

            if (!token) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            // JWT 검증
            const decoded = jwt.verify(token, JWT_SECRET);
            const userId = decoded.id;
            const { name, image } = req.body; // 이미지 URL 추가

            if (!name || !userId) {
                return res.status(400).json({ message: 'Group name and user ID are required' });
            }

            const db = await open({
                filename: './database.sqlite',
                driver: sqlite3.Database,
            });

            // 그룹 생성 (이미지 URL 포함)
            const result = await db.run('INSERT INTO groups (name, user_id, image) VALUES (?, ?, ?)', [name, userId, image]);

            const newGroup = { id: result.lastID, name, user_id: userId, image }; // 이미지 URL 포함
            res.status(201).json(newGroup);
        } catch (error) {
            console.error('Error creating group:', error);
            res.status(500).json({ message: 'Failed to create group' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
