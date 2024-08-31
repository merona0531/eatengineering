import jwt from 'jsonwebtoken';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const JWT_SECRET = '26fd3f027c9d9fe3dfcebab38afa893141a51a9f5e0bb46f36058f35fff32eab45da434b95c1ab7afb1d66045ecd7657f9639d24967f349715b9011878f306c3'; // 여기에 실제 JWT 비밀 키를 넣으세요.

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        try {
            const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });

            const decoded = jwt.verify(token, JWT_SECRET);
            const username = decoded.username;

            const { action } = req.body;
            const invitationId = req.query.id;

            const db = await open({ filename: './database.sqlite', driver: sqlite3.Database });

            const invitation = await db.get('SELECT * FROM invitations WHERE id = ?', [invitationId]);

            if (!invitation) return res.status(404).json({ message: 'Invitation not found' });
            if (invitation.invitee_id !== username) return res.status(403).json({ message: 'You are not authorized to respond to this invitation' });

            if (action === 'accept') {
                await db.run('UPDATE invitations SET status = ? WHERE id = ?', ['accepted', invitationId]);

                // username을 user_id로 변환
                const user = await db.get('SELECT id FROM users WHERE username = ?', [username]);
                if (!user) return res.status(404).json({ message: 'User not found' });

                const userId = user.id;

                // 그룹에 사용자 추가
                await db.run('INSERT INTO group_members (group_id, user_id) VALUES (?, ?)', [invitation.group_id, userId]);

                res.status(200).json({ message: 'Invitation accepted' });

            } else if (action === 'reject') {
                await db.run('UPDATE invitations SET status = ? WHERE id = ?', ['rejected', invitationId]);

                res.status(200).json({ message: 'Invitation rejected' });

            } else {
                res.status(400).json({ message: 'Invalid action' });
            }
        } catch (error) {
            console.error('Error processing invitation:', error);
            res.status(500).json({ message: 'Failed to process invitation' });
        }
    } else {
        res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
    }
}
