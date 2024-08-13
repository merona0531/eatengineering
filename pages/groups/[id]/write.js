import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';

export default function WriteBlogPage() {
    const router = useRouter();
    const { id } = router.query; // 그룹 ID
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState(null); // 사용자의 ID를 상태로 저장

    // 사용자 ID를 가져오는 함수 (예: 로그인 상태 확인)
    const fetchUserId = async () => {
        try {
            const res = await fetch('/api/check-auth', {
                method: 'GET',
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                setUserId(data.user?.id); // 사용자 ID 상태 업데이트
            } else {
                console.error('Failed to fetch user ID');
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    // 컴포넌트 마운트 시 사용자 ID를 가져옴
    useEffect(() => {
        fetchUserId();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        try {
            const res = await fetch(`/api/groups/${id}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, userId }), // userId를 포함
            });

            if (res.ok) {
                router.push(`/groups/${id}`); // 블로그 작성 후 그룹 페이지로 돌아가기
            } else {
                console.error('Failed to post blog');
            }
        } catch (error) {
            console.error('Error posting blog:', error);
        }
    };

    return (
        <div>
            <h1>블로그 작성</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit">등록</button>
            </form>
        </div>
    );
}
