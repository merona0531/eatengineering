import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

// Define formats used by ReactQuill
const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size',
    'h1',
];

export default function WriteBlogPage() {
    const router = useRouter();
    const { id } = router.query;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const res = await fetch('/api/check-auth', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    setUserId(data.user?.id);
                } else {
                    console.error('Failed to fetch user ID');
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

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
                body: JSON.stringify({ title, content, userId }), // content now contains HTML
            });

            if (res.ok) {
                router.push(`/groups/${id}`);
            } else {
                console.error('Failed to post blog');
            }
        } catch (error) {
            console.error('Error posting blog:', error);
        }
    };

    // Custom image upload handler
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.url) {
                return res.data.url;
            } else {
                console.error('Failed to upload image');
                return null;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ align: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                [
                    { color: [] },
                    { background: [] },
                ],
            ],
            handlers: {
                image: function () {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();

                    input.onchange = async () => {
                        const file = input.files[0];
                        const url = await handleImageUpload(file);
                        if (url) {
                            const range = this.quill.getSelection();
                            this.quill.insertEmbed(range.index, 'image', url);
                        }
                    };
                },
            },
        },
    }), []);

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
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        value={content}
                        onChange={setContent}
                    />
                </div>
                <button type="submit">등록</button>
            </form>
        </div>
    );
}
