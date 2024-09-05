import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Reset } from 'styled-reset';
import styled from "styled-components";
import {Logo} from "../../../styles/mainstyle";
import MapComponent from "../../../components/kakaomap/index";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { Quill } from 'react-quill';

// Register image resize module with Quill
Quill.register('modules/imageResize', ImageResize);

const formats = [
    'font', 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link', 'align', 'color', 'background',
    'size', 'h1',
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FAFAED;
  height: auto;
  min-height: 100vh;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const TitleInput = styled.input`
  width: 994px;
  height: 50px;
  padding-left: 16px;
  border: none;
  outline: none;
  border-bottom: 1px solid #bdbdbd;
  font-size: 25px;
  background-color: #fafaed;
`;

const BodyWrapper = styled.div`
  margin-top: 20px;
`;

const PublishBtn = styled.button`
  height: 65px;
  width: 125px;
  border-radius: 20px;
  font-size: 23px;
  background-color: #6B1300;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin-top: 20px;
  font-family: HancomEQN;
  margin-bottom: 280px;

  &:hover {
    background-color: #EBC8BD;
    color: #6B1300;
  }
`;

export default function WriteBlogPage() {
    const router = useRouter();
    const { id } = router.query;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null); // To store the selected place

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
                body: JSON.stringify({ title, content, userId, place: selectedPlace }), // Include selectedPlace
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

    const handlePlaceSelect = (place) => {
        setSelectedPlace(place); // Set the selected place when chosen
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ align: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                [{ color: [] }, { background: [] }],
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
                            this.quill.getModule('imageResize'); // Ensure imageResize module is enabled
                        }
                    };
                },
            },
        },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
        },
    }), []);

    return (
        <>
            <Reset />
            <Container>
                <Logo onClick={() => router.push('/')}>
                    <svg width="356" height="75" viewBox="0 0 712 150" fill="none" xmlns="http://www.w3.org/2000/svg" cursor={"pointer"}>
                    </svg>
                </Logo>
                <form onSubmit={handleSubmit}>
                    <TitleWrapper>
                        <TitleInput
                            type="text"
                            placeholder="제목"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </TitleWrapper>
                    <BodyWrapper>
                        <ReactQuill
                            theme="snow"
                            modules={modules}
                            value={content}
                            onChange={setContent}
                        />
                    </BodyWrapper>
                    <div>
                        <MapComponent onPlaceSelect={handlePlaceSelect}/> {/* Pass the handler */}
                    </div>
                    <PublishBtn type="submit">PUBLISH</PublishBtn>
                </form>
            </Container>
        </>
    );
}
