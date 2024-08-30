import jwt from 'jsonwebtoken';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const JWT_SECRET = '26fd3f027c9d9fe3dfcebab38afa893141a51a9f5e0bb46f36058f35fff32eab45da434b95c1ab7afb1d66045ecd7657f9639d24967f349715b9011878f306c3';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const token = req.cookies.token;
            if (!token) return res.status(401).json({ message: 'Not authenticated' });

            const decoded = jwt.verify(token, JWT_SECRET);
            const inviterId = decoded.id;
            const { inviteeId } = req.body;
            const groupId = req.query.id;

            if (!inviteeId || !groupId) return res.status(400).json({ message: 'Missing required data' });

            const db = await open({ filename: './database.sqlite', driver: sqlite3.Database });

            // 초대 추가
            const result = await db.run(
                'INSERT INTO invitations (group_id, inviter_id, invitee_id) VALUES (?, ?, ?)',
                [groupId, inviterId, inviteeId]
            );

            const invitationId = result.lastID; // 새로 생성된 초대 ID

            res.status(201).json({ message: 'Invitation sent', invitationId });
        } catch (error) {
            console.error('Error inviting friend:', error);
            res.status(500).json({ message: 'Failed to invite friend' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
