import jwt from 'jsonwebtoken';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const JWT_SECRET = '26fd3f027c9d9fe3dfcebab38afa893141a51a9f5e0bb46f36058f35fff32eab45da434b95c1ab7afb1d66045ecd7657f9639d24967f349715b9011878f306c3';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const token = req.cookies.token || req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
            }

            const decoded = jwt.verify(token, JWT_SECRET);
            const username = decoded.username; // username을 사용

            const db = await open({
                filename: './database.sqlite',
                driver: sqlite3.Database,
            });

            // `username`으로 `invitee_id`를 조회하여 초대 내역 조회
            const invitations = await db.all('SELECT i.id AS invitation_id, g.name AS group_name, i.invitee_id, i.status FROM invitations i INNER JOIN groups g ON i.group_id = g.id WHERE i.invitee_id = ? AND i.status = ?', [username, 'pending']);

            res.status(200).json(invitations);
        } catch (error) {
            console.error('초대 내역 가져오기 에러:', error);
            res.status(500).json({ message: '초대 내역을 가져오지 못했습니다.' });
        }
    } else {
        res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
    }
}
