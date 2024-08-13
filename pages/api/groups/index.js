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
            const userId = decoded.id;

            const db = await open({
                filename: './database.sqlite',
                driver: sqlite3.Database,
            });

            // 사용자와 관련된 그룹만 반환
            const groups = await db.all('SELECT * FROM groups WHERE user_id = ?', [userId]);
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
            const { name } = req.body;

            if (!name || !userId) {
                return res.status(400).json({ message: 'Group name and user ID are required' });
            }

            const db = await open({
                filename: './database.sqlite',
                driver: sqlite3.Database,
            });

            // 그룹 생성
            const result = await db.run('INSERT INTO groups (name, user_id) VALUES (?, ?)', [name, userId]);

            const newGroup = { id: result.lastID, name, user_id: userId };
            res.status(201).json(newGroup);
        } catch (error) {
            console.error('Error creating group:', error);
            res.status(500).json({ message: 'Failed to create group' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
