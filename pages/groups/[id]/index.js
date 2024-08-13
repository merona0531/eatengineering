import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function GroupDetailPage() {
    const router = useRouter();
    const { id } = router.query;  // URL에서 그룹 ID 가져오기
    const [groupName, setGroupName] = useState('');  // 그룹 이름 상태
    const [blogs, setBlogs] = useState([]);  // 블로그 목록 상태

    useEffect(() => {
        if (id) {
            // 그룹 정보와 블로그 목록을 가져오는 함수
            const fetchGroupData = async () => {
                try {
                    const res = await fetch(`/api/groups/${id}`, {
                        method: 'GET',
                        credentials: 'include',
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setGroupName(data.group.name);  // 그룹 이름 상태 업데이트
                        setBlogs(data.blogs);  // 블로그 목록 상태 업데이트
                    } else {
                        console.error('Failed to fetch group data');
                    }
                } catch (error) {
                    console.error('Error fetching group data:', error);
                }
            };

            fetchGroupData();  // 컴포넌트가 로드될 때 그룹 데이터 가져오기
        }
    }, [id]);

    // 글쓰기 버튼 클릭 시 블로그 작성 화면으로 이동
    const handleWriteBlog = () => {
        router.push(`/groups/${id}/write`);  // '/groups/[id]/write' 경로로 이동
    };

    return (
        <div>
            <h1>{groupName} 그룹 블로그</h1> {/* 그룹 이름을 큰 제목으로 표시 */}
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <h3>{blog.title}</h3> {/* 블로그 제목 표시 */}
                    </li>
                ))}
            </ul>

            <button onClick={handleWriteBlog}>글쓰기</button> {/* 글쓰기 버튼 */}
        </div>
    );
}
