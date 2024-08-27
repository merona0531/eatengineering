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
  margin-top: 20px;
`;

const BlogContent = styled.div`
  margin-top: 20px;
  font-size: 20px;
  line-height: 1.6;
  
  
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
  h3 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 2em;
  }
  h1 {
    font-size: 2.5em;
  }
`;

const DeleteButton = styled.button`
  width: 100px;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #FF4B4B;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #FF2C2C;
  }
`;

export default function BlogDetailPage() {
    const router = useRouter();
    const { id, groupId } = router.query;  // URL에서 블로그 ID 및 그룹 ID 가져오기
    const [blog, setBlog] = useState(null);  // 블로그 상태

    useEffect(() => {
        if (id) {
            const fetchBlogData = async () => {
                try {
                    const res = await fetch(`/api/blogs/${id}`, {
                        method: 'GET',
                        credentials: 'include',
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setBlog(data);
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

    // 블로그 삭제 함수
    const handleDelete = async () => {
        const confirmDelete = confirm('정말로 이 블로그를 삭제하시겠습니까?');

        if (confirmDelete) {
            try {
                const res = await fetch(`/api/blogs/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });

                if (res.ok) {
                    alert('블로그가 삭제되었습니다.');
                    router.push(`/groups/${groupId}`);  // 블로그 목록으로 리다이렉트
                } else {
                    console.error('Failed to delete blog');
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    if (!blog) return <p>Loading...</p>;

    return (
        <>
            <Reset />
            <Wrapper>
                <Container>
                    <BlogTitle>{blog.title}</BlogTitle>
                    <BlogContent dangerouslySetInnerHTML={{ __html: blog.content }} />
                    <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
                </Container>
            </Wrapper>
        </>
    );
}
