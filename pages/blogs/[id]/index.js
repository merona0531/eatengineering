import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Reset } from 'styled-reset';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff9df;
  height: 100vh;
`;
const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
`;
const BlogTitle = styled.h1`
  font-size: 36px;
  color: #FFBD43;
`;
const BlogContent = styled.div`
  margin-top: 20px;
  font-size: 20px;
  line-height: 1.6;
`;

export default function BlogDetailPage() {
    const router = useRouter();
    const { id } = router.query;  // URL에서 블로그 ID 가져오기
    const [blog, setBlog] = useState(null);  // 블로그 상태

    useEffect(() => {
        if (id) {
            // 블로그 상세 정보를 가져오는 함수
            const fetchBlogData = async () => {
                try {
                    const res = await fetch(`/api/blogs/${id}`, {
                        method: 'GET',
                        credentials: 'include',
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setBlog(data);  // 블로그 상태 업데이트
                    } else {
                        console.error('Failed to fetch blog data');
                    }
                } catch (error) {
                    console.error('Error fetching blog data:', error);
                }
            };

            fetchBlogData();  // 컴포넌트가 로드될 때 블로그 데이터 가져오기
        }
    }, [id]);

    if (!blog) return <p>Loading...</p>;  // 로딩 중 표시

    return (
        <>
            <Reset />
            <Wrapper>
                <Container>
                    <BlogTitle>{blog.title}</BlogTitle>
                    <BlogContent>{blog.content}</BlogContent>
                </Container>
            </Wrapper>
        </>
    );
}
