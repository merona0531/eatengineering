import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Reset } from 'styled-reset';
import styled from "styled-components";
import MapComponent from "../../../components/kakaomap/index";
import { PiMapPinLight } from "react-icons/pi";

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

const hueStep = 90;  // 360 / 4 layers
const delayStep = 0.115;  // seconds

const Button = styled.button`
  background: hsl(10.7, 100%, 21%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  letter-spacing: .05em;
  overflow: hidden;
  padding: 1em 2em;
  min-height: 3.3em;
  position: relative;
  outline: none;
  font-weight: bold;
  margin-top: 20px;
  font-size: 20px;
  font-family: HancomEQN ;

  &:active,
  &:focus {
    outline: 3px solid hsl(calc(244 + ${hueStep}), 98%, 80%);
  }
  
  span {
    position: relative;
    z-index: 2;
  }

  &:hover {
    color: black;
  }
`;

const BackgroundLayer = styled.i`
  background: hsl(${props => props.hueBg}, 98%, 85%);
  border-radius: 50%;
  display: block;
  height: 0;
  left: 50%;
  margin: -50% 0 0 -50%;
  padding-top: 100%;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: scale(0);
  transform-origin: 50% 50%;
  transition: transform 0.175s cubic-bezier(0.5, 1, 0.89, 1);
  z-index: 0;
  transition-delay: ${props => props.delay}s;

  ${Button}:hover &,
  ${Button}:focus &,
  ${Button}:active & {
    transform: scale(1.5);
    transition: transform 0.35s cubic-bezier(0.11, 0, 0.5, 0);
    transition-delay: ${props => props.hoverDelay}s;
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FAFAED;
  height: auto;
  min-height: 100vh;
`;

const Logo=styled.div`
    height: 100px;
  display: flex;
  margin-top: 60px;
  align-items: center;
`
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


const PlaceSelectBtn = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6B1300;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin-right: 10px;

  &:hover {
    background-color: #EBC8BD;
    color: #6B1300;
  }
`;

const SelectedPlaceText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const PlaceContainer=styled.div`
  margin-top: 20px;
    display: flex;
  align-items: center;
  width: 1000px;
  justify-content: flex-end;
`
export default function WriteBlogPage() {
    const router = useRouter();
    const { id } = router.query;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null); // To store the selected place
    const [showMap, setShowMap] = useState(false); // State to toggle MapComponent

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
        setShowMap(false); // Hide the map after selecting a place
    };
    const handleToggleMap = () => {
        setShowMap(prevState => !prevState); // Toggle map visibility
    };
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

    const layers = [0, 1, 2, 3].map(i => (
        <BackgroundLayer
            key={i}
            hueBg={`calc(10.7 - ${hueStep * (i + 1)})`}
            delay={(delayStep / 2) * (4 - i)}
            hoverDelay={delayStep * (i + 1)}
            aria-hidden="true"
        />
    ));

    return (
        <>
            <Reset />
            <Container>
                <Logo onClick={() => router.push('/')}>
                    <svg width="356" height="75" viewBox="0 0 712 150" fill="none" xmlns="http://www.w3.org/2000/svg" cursor={"pointer"}>
                        <path d="M60.4513 62.52C59.798 62.6133 58.5847 62.66 56.8113 62.66C55.038 62.66 53.7313 62.3333 52.8913 61.68C52.238 61.0267 51.9113 59.44 51.9113 56.92C51.9113 54.4 52.1447 52.4867 52.6113 51.18C53.078 49.78 54.5247 49.08 56.9513 49.08C59.4713 49.08 61.8513 49.6867 64.0913 50.9C66.798 48.8467 69.318 45.6733 71.6513 41.38C73.9847 37.0867 75.1513 32.6533 75.1513 28.08C75.1513 21.4533 73.1447 16.6 69.1313 13.52C65.2113 10.44 59.098 8.9 50.7913 8.9C38.8447 8.9 29.0447 11.2333 21.3913 15.9C13.8313 20.5667 10.0513 25.5133 10.0513 30.74C10.0513 33.26 11.078 35.36 13.1313 37.04C15.1847 38.6267 17.238 39.7 19.2913 40.26C18.918 43.9933 17.7513 47.4467 15.7913 50.62C12.1513 50.06 8.74466 48.1933 5.57133 45.02C2.39799 41.7533 0.811328 37.3667 0.811328 31.86C0.811328 22.7133 6.08466 15.2 16.6313 9.31999C27.178 3.43999 40.2447 0.499997 55.8313 0.499997C68.338 0.499997 78.2313 2.83333 85.5113 7.5C92.7913 12.1667 96.4313 19.0267 96.4313 28.08C96.4313 34.4267 94.0513 40.1667 89.2913 45.3C84.5313 50.34 78.7913 54.4933 72.0713 57.76C73.658 59.3467 75.058 61.5867 76.2713 64.48C77.578 67.3733 78.6047 69.7533 79.3513 71.62C80.1913 73.3933 80.8447 74.84 81.3113 75.96C81.778 77.08 82.4313 78.6667 83.2713 80.72C86.9113 90.6133 90.178 97.8933 93.0713 102.56C96.058 107.32 98.9047 109.7 101.611 109.7C102.171 109.7 102.591 109.653 102.871 109.56L104.271 114.6C99.698 118.24 94.4713 120.06 88.5913 120.06C82.7113 120.06 78.558 118.52 76.1313 115.44C73.7047 112.453 71.4647 106.247 69.4113 96.82C69.1313 95.8867 68.338 92.48 67.0313 86.6C64.418 74.0933 62.2247 66.0667 60.4513 62.52ZM33.4313 28.92C33.4313 26.7733 32.3113 24.44 30.0713 21.92L30.2113 20.94C35.158 18.0467 41.318 16.6 48.6913 16.6C51.5847 16.6 53.7313 16.8333 55.1313 17.3C55.598 18.3267 55.8313 19.7733 55.8313 21.64C55.8313 25.7467 53.4047 37.5067 48.5513 56.92C43.7913 76.3333 40.9913 90.8467 40.1513 100.46C34.6447 102.047 28.5313 102.84 21.8113 102.84C20.2247 102.84 19.058 102.7 18.3113 102.42C18.778 96.4467 21.3913 84.2667 26.1513 65.88C31.0047 47.4 33.4313 35.08 33.4313 28.92ZM113.293 108.72C107.693 108.72 103.026 106.853 99.2926 103.12C95.6526 99.48 93.8326 95.2333 93.8326 90.38C93.8326 85.4333 94.9992 80.86 97.3326 76.66C99.6659 72.3667 102.979 68.4 107.273 64.76C111.659 61.12 117.353 58.1333 124.353 55.8C131.353 53.3733 139.099 52.02 147.593 51.74C152.539 39.5133 156.926 25.84 160.753 10.72C160.846 10.16 160.893 9.45999 160.893 8.61999C160.893 7.68666 160.426 6.89333 159.493 6.24V4.84C167.519 3.34666 174.846 2.59999 181.473 2.59999L189.873 3.16C192.299 7.45333 193.653 13.4267 193.933 21.08C194.213 28.64 194.399 41.8 194.493 60.56C204.573 64.9467 213.206 70.5 220.393 77.22C220.019 78.4333 219.273 79.6467 218.153 80.86C217.126 81.98 216.146 82.82 215.213 83.38L213.813 84.22C208.306 78.8067 201.913 74.1867 194.633 70.36C194.819 75.68 195.333 80.16 196.173 83.8C197.479 89.7733 199.019 92.76 200.793 92.76C201.819 92.76 203.033 92.5267 204.433 92.06L206.533 97.52C200.093 101.627 193.933 103.68 188.053 103.68C178.346 103.68 173.493 96.3533 173.493 81.7V63.36C166.959 61.7733 161.033 60.7933 155.713 60.42C143.579 92.62 129.439 108.72 113.293 108.72ZM144.093 60.28C133.546 61.12 124.773 64.8067 117.773 71.34C110.773 77.8733 107.273 83.9867 107.273 89.68C107.273 95.3733 109.466 98.22 113.853 98.22C122.813 98.22 132.893 85.5733 144.093 60.28ZM171.953 13.8C171.766 13.7067 171.393 13.66 170.833 13.66C170.273 13.66 169.899 13.7067 169.713 13.8C168.873 20.8933 165.233 33.6333 158.793 52.02C163.366 52.3 168.266 52.9533 173.493 53.98C173.493 31.02 172.979 17.6267 171.953 13.8ZM302.068 56.92C303.095 59.44 303.795 62.1933 304.168 65.18C302.022 66.4867 298.755 67.84 294.368 69.24C289.982 70.64 285.875 71.48 282.048 71.76C277.942 81.3733 272.248 89.12 264.968 95C257.782 100.787 248.822 103.68 238.088 103.68C227.355 103.68 219.142 100.087 213.448 92.9C207.848 85.62 205.048 75.5867 205.048 62.8C205.048 49.92 208.035 38.2067 214.008 27.66C219.982 17.02 228.522 8.71333 239.628 2.73999L242.568 7.64C232.488 20.24 227.448 38.3 227.448 61.82C227.448 77.1267 229.782 86.88 234.448 91.08C236.595 93.1333 239.302 94.16 242.568 94.16C251.808 94.16 258.528 86.2267 262.728 70.36C255.448 69.0533 249.848 65.9733 245.928 61.12C242.008 56.1733 240.048 49.3133 240.048 40.54C240.048 31.6733 242.568 23.74 247.608 16.74C252.648 9.64666 258.715 6.09999 265.808 6.09999C272.995 6.09999 278.595 9.27333 282.608 15.62C286.622 21.8733 288.628 29.9467 288.628 39.84C288.628 46.0933 287.368 53.7 284.848 62.66C289.048 62.4733 293.902 61.0267 299.408 58.32L302.068 56.92ZM266.508 39.56C266.508 32.84 266.135 27.8933 265.388 24.72C264.642 21.4533 262.868 19.82 260.068 19.82C257.268 19.82 254.655 21.92 252.228 26.12C249.895 30.2267 248.728 35.3133 248.728 41.38C248.728 47.4467 250.082 52.2067 252.788 55.66C255.495 59.02 259.322 60.9333 264.268 61.4C265.762 53.4667 266.508 46.1867 266.508 39.56ZM346.565 29.76L346.705 32.42C346.705 39.7 345.819 47.5867 344.045 56.08C342.272 64.5733 339.799 72.6933 336.625 80.44C333.452 88.1867 329.299 94.6267 324.165 99.76C319.125 104.893 313.899 107.46 308.485 107.46C303.165 107.46 298.965 105.873 295.885 102.7C292.899 99.5267 291.405 95.14 291.405 89.54C291.405 80.6733 294.999 71.06 302.185 60.7C309.372 50.2467 316.932 41.6133 324.865 34.8C324.865 25.84 323.839 20.38 321.785 18.42C320.759 17.4867 319.265 17.02 317.305 17.02C315.439 17.02 312.639 17.86 308.905 19.54C305.265 21.22 301.765 23.5067 298.405 26.4L294.905 21.5C298.265 17.3933 303.165 13.52 309.605 9.87999C316.139 6.14666 322.345 4.28 328.225 4.28C337.559 4.28 343.345 9.69333 345.585 20.52C359.212 8.57333 370.179 2.59999 378.485 2.59999C382.592 2.59999 386.045 4.23333 388.845 7.5C391.739 10.7667 393.185 15.2 393.185 20.8C393.185 26.3067 390.899 37.46 386.325 54.26C381.752 71.06 379.465 81.7 379.465 86.18C379.465 90.5667 380.865 92.76 383.665 92.76C384.599 92.76 385.765 92.5267 387.165 92.06L389.265 97.38C383.199 101.58 377.505 103.68 372.185 103.68C366.865 103.68 363.085 102.42 360.845 99.9C358.699 97.38 357.625 94.0667 357.625 89.96C357.625 85.8533 359.819 75.3067 364.205 58.32C368.592 41.24 370.785 30.6467 370.785 26.54C370.785 21.4067 368.919 18.84 365.185 18.84C360.705 18.84 354.499 22.48 346.565 29.76ZM305.825 94.16C309.559 94.16 313.245 89.68 316.885 80.72C320.619 71.76 323.139 60.28 324.445 46.28C319.312 51.04 314.132 57.7133 308.905 66.3C303.772 74.8867 301.205 81.9333 301.205 87.44C301.205 89.68 301.625 91.36 302.465 92.48C303.399 93.6 304.519 94.16 305.825 94.16ZM419.366 63.9C419.366 66.7 418.466 71.5333 416.666 78.4C414.866 85.2 413.966 89.6667 413.966 91.8C413.966 93.8667 414.266 94.9 414.866 94.9C415.266 94.9 416.799 94.2667 419.466 93L420.666 92.4L422.366 95.9C421.766 96.4333 420.966 97.1 419.966 97.9C418.966 98.7 417.099 99.8 414.366 101.2C411.633 102.533 409.099 103.2 406.766 103.2C404.433 103.2 402.599 102.5 401.266 101.1C399.933 99.6333 399.266 97.7 399.266 95.3C399.266 92.8333 400.099 88.5 401.766 82.3C403.433 76.0333 404.266 71.9667 404.266 70.1C404.266 67.3 403.399 64.6667 401.666 62.2L400.766 61L400.866 59.7C404.399 58.7 410.133 58.2 418.066 58.2C418.933 59.2 419.366 61.1 419.366 63.9ZM407.966 47.3C406.633 45.9667 405.966 44.2 405.966 42C405.966 39.8 406.866 37.8667 408.666 36.2C410.533 34.5333 412.666 33.7 415.066 33.7C417.466 33.7 419.333 34.3667 420.666 35.7C421.999 37.0333 422.666 38.8 422.666 41C422.666 43.1333 421.699 45.0333 419.766 46.7C417.899 48.3667 415.799 49.2 413.466 49.2C411.133 49.2 409.299 48.5667 407.966 47.3ZM463.592 86.28C463.592 91.32 461.352 95.44 456.872 98.64C452.472 101.84 447.432 103.44 441.752 103.44C436.072 103.44 431.552 102.24 428.192 99.84C424.912 97.44 423.272 95.32 423.272 93.48C423.272 92.36 424.672 90.56 427.472 88.08C430.272 85.52 432.632 83.96 434.552 83.4C438.552 86.36 441.832 91.04 444.392 97.44C447.352 97.2 448.832 95.8 448.832 93.24C448.832 89.56 445.592 84.36 439.112 77.64C432.632 70.84 429.392 65.44 429.392 61.44C429.392 57.44 431.192 54.36 434.792 52.2C438.392 49.96 442.712 48.84 447.752 48.84C452.872 48.84 456.712 49.76 459.272 51.6C461.832 53.36 463.112 55.8 463.112 58.92C463.112 61.96 460.672 66.2 455.792 71.64C456.352 72.2 457.072 72.96 457.952 73.92C458.832 74.8 459.992 76.52 461.432 79.08C462.872 81.64 463.592 84.04 463.592 86.28ZM452.072 67.44C455.432 64.56 457.112 61.72 457.112 58.92C457.112 56.12 455.192 54.72 451.352 54.72C449.512 54.72 447.992 55.12 446.792 55.92C445.592 56.64 444.992 57.48 444.992 58.44C444.992 60.2 446.752 62.68 450.272 65.88L452.072 67.44ZM496.768 54.84C493.568 54.84 491.008 57.52 489.088 62.88C487.168 68.16 486.208 73.84 486.208 79.92C486.208 89.52 489.168 94.32 495.088 94.32C497.008 94.32 499.048 93.88 501.208 93C503.368 92.04 505.088 91.12 506.368 90.24L508.168 88.8L510.928 92.52C510.288 93.4 509.008 94.56 507.088 96C505.168 97.44 503.368 98.64 501.688 99.6C500.008 100.56 497.848 101.44 495.208 102.24C492.568 103.04 489.968 103.44 487.408 103.44C481.168 103.44 476.488 101.4 473.368 97.32C470.248 93.24 468.688 87.76 468.688 80.88C468.688 71.36 471.288 63.64 476.488 57.72C481.768 51.8 488.528 48.84 496.768 48.84C502.128 48.84 506.368 50.08 509.488 52.56C512.688 54.96 514.288 57.96 514.288 61.56C514.288 65.08 513.168 68.12 510.928 70.68C508.928 70.68 506.608 70.24 503.968 69.36C501.328 68.48 499.328 67.4 497.968 66.12L499.768 55.56C499.048 55.08 498.048 54.84 496.768 54.84ZM516.384 81.24C516.384 71.24 519.384 63.36 525.384 57.6C531.464 51.76 538.344 48.84 546.024 48.84C550.744 48.84 554.624 50 557.664 52.32C560.704 54.64 562.224 57.76 562.224 61.68C562.224 65.52 561.224 68.76 559.224 71.4C557.304 74.04 554.944 76.08 552.144 77.52C546.464 80.32 541.264 82.08 536.544 82.8L533.664 83.16C534.224 90.68 537.304 94.44 542.904 94.44C544.824 94.44 546.864 93.96 549.024 93C551.184 92.04 552.864 91.08 554.064 90.12L555.864 88.68L558.744 92.52C558.104 93.4 556.824 94.56 554.904 96C552.984 97.44 551.184 98.64 549.504 99.6C544.864 102.16 539.784 103.44 534.264 103.44C528.744 103.44 524.384 101.48 521.184 97.56C517.984 93.64 516.384 88.2 516.384 81.24ZM533.544 77.28C537.624 76.56 540.864 74.84 543.264 72.12C545.664 69.4 546.864 65.88 546.864 61.56C546.864 57.24 545.584 55.08 543.024 55.08C539.984 55.08 537.624 57.68 535.944 62.88C534.344 68 533.544 72.8 533.544 77.28ZM568.033 102.36H565.753C565.753 98.6 566.873 91.4 569.113 80.76C571.433 70.12 572.593 64.08 572.593 62.64C572.593 60 571.473 57.2 569.233 54.24L568.153 52.8L568.273 51.24C572.593 50.04 579.513 49.44 589.033 49.44C590.073 50.8 590.633 53.28 590.713 56.88C597.673 51.52 603.553 48.84 608.353 48.84C611.233 48.84 613.513 49.84 615.193 51.84C616.953 53.84 617.833 56.36 617.833 59.4C617.833 62.36 616.913 67.52 615.073 74.88C613.233 82.24 612.313 87.2 612.313 89.76C612.313 92.24 612.633 93.48 613.273 93.48C613.753 93.48 615.433 92.72 618.313 91.2L619.753 90.48L621.913 94.68C621.193 95.32 620.233 96.12 619.033 97.08C617.833 98.04 615.593 99.36 612.313 101.04C609.113 102.64 606.233 103.44 603.673 103.44C597.833 103.44 594.913 100.12 594.913 93.48C594.913 90.68 595.793 85.52 597.553 78C599.393 70.48 600.313 65.64 600.313 63.48C600.313 61.32 599.633 60.24 598.273 60.24C595.953 60.24 593.113 61.24 589.753 63.24C589.513 64.6 588.713 68.2 587.353 74.04C584.553 86.6 583.153 95.48 583.153 100.68C580.353 101.8 575.313 102.36 568.033 102.36ZM625.251 81.24C625.251 71.24 628.251 63.36 634.251 57.6C640.331 51.76 647.211 48.84 654.891 48.84C659.611 48.84 663.491 50 666.531 52.32C669.571 54.64 671.091 57.76 671.091 61.68C671.091 65.52 670.091 68.76 668.091 71.4C666.171 74.04 663.811 76.08 661.011 77.52C655.331 80.32 650.131 82.08 645.411 82.8L642.531 83.16C643.091 90.68 646.171 94.44 651.771 94.44C653.691 94.44 655.731 93.96 657.891 93C660.051 92.04 661.731 91.08 662.931 90.12L664.731 88.68L667.611 92.52C666.971 93.4 665.691 94.56 663.771 96C661.851 97.44 660.051 98.64 658.371 99.6C653.731 102.16 648.651 103.44 643.131 103.44C637.611 103.44 633.251 101.48 630.051 97.56C626.851 93.64 625.251 88.2 625.251 81.24ZM642.411 77.28C646.491 76.56 649.731 74.84 652.131 72.12C654.531 69.4 655.731 65.88 655.731 61.56C655.731 57.24 654.451 55.08 651.891 55.08C648.851 55.08 646.491 57.68 644.811 62.88C643.211 68 642.411 72.8 642.411 77.28ZM711.912 86.28C711.912 91.32 709.672 95.44 705.192 98.64C700.792 101.84 695.752 103.44 690.072 103.44C684.392 103.44 679.872 102.24 676.512 99.84C673.232 97.44 671.592 95.32 671.592 93.48C671.592 92.36 672.992 90.56 675.792 88.08C678.592 85.52 680.952 83.96 682.872 83.4C686.872 86.36 690.152 91.04 692.712 97.44C695.672 97.2 697.152 95.8 697.152 93.24C697.152 89.56 693.912 84.36 687.432 77.64C680.952 70.84 677.712 65.44 677.712 61.44C677.712 57.44 679.512 54.36 683.112 52.2C686.712 49.96 691.032 48.84 696.072 48.84C701.192 48.84 705.032 49.76 707.592 51.6C710.152 53.36 711.432 55.8 711.432 58.92C711.432 61.96 708.992 66.2 704.112 71.64C704.672 72.2 705.392 72.96 706.272 73.92C707.152 74.8 708.312 76.52 709.752 79.08C711.192 81.64 711.912 84.04 711.912 86.28ZM700.392 67.44C703.752 64.56 705.432 61.72 705.432 58.92C705.432 56.12 703.512 54.72 699.672 54.72C697.832 54.72 696.312 55.12 695.112 55.92C693.912 56.64 693.312 57.48 693.312 58.44C693.312 60.2 695.072 62.68 698.592 65.88L700.392 67.44ZM10.997 148.974L16.613 130.8H20.539L26.181 148.974H22.853L21.553 144.58H15.625L14.325 148.974H10.997ZM18.589 134.7L16.457 141.876H20.721L18.589 134.7ZM70.7375 149H67.0195L62.8595 141.902H61.2735V149H58.1535L58.1795 130.8H65.0175C65.9362 130.8 66.7508 131.06 67.4615 131.58C68.1722 132.1 68.7268 132.785 69.1255 133.634C69.5415 134.466 69.7495 135.367 69.7495 136.338C69.7495 137.066 69.6022 137.785 69.3075 138.496C69.0302 139.189 68.6402 139.813 68.1375 140.368C67.6348 140.923 67.0542 141.339 66.3955 141.616L70.7375 149ZM66.5775 136.338C66.5775 135.991 66.4995 135.636 66.3435 135.272C66.1875 134.891 65.9795 134.57 65.7195 134.31C65.4595 134.05 65.1562 133.92 64.8095 133.92H61.2735V138.6H64.8095C65.1562 138.6 65.4595 138.487 65.7195 138.262C65.9795 138.037 66.1875 137.751 66.3435 137.404C66.4995 137.04 66.5775 136.685 66.5775 136.338ZM92.7622 149H82.9602V130.8H92.7622V133.712H86.0802V138.782H91.4882V141.408H86.0802V146.088H92.7622V149ZM113.606 149.286C112.358 149.286 111.205 149.043 110.148 148.558C109.09 148.055 108.154 147.397 107.34 146.582C106.525 145.75 105.884 144.779 105.416 143.67C104.948 142.543 104.714 141.295 104.714 139.926C104.714 138.591 104.948 137.361 105.416 136.234C105.901 135.09 106.542 134.093 107.34 133.244C108.137 132.412 109.064 131.753 110.122 131.268C111.196 130.783 112.358 130.54 113.606 130.54C114.923 130.54 116.18 130.843 117.376 131.45C118.572 132.039 119.681 132.958 120.704 134.206L118.182 136.286C117.471 135.402 116.734 134.769 115.972 134.388C115.209 133.989 114.42 133.79 113.606 133.79C112.826 133.79 112.098 133.946 111.422 134.258C110.763 134.57 110.165 135.003 109.628 135.558C109.108 136.095 108.7 136.737 108.406 137.482C108.111 138.21 107.964 139.025 107.964 139.926C107.964 140.827 108.111 141.642 108.406 142.37C108.7 143.081 109.108 143.713 109.628 144.268C110.148 144.823 110.746 145.256 111.422 145.568C112.098 145.88 112.826 146.036 113.606 146.036C114.42 146.036 115.209 145.845 115.972 145.464C116.734 145.065 117.471 144.424 118.182 143.54L120.704 145.62C119.681 146.868 118.572 147.795 117.376 148.402C116.18 148.991 114.923 149.286 113.606 149.286ZM150.479 139.848C150.479 141.148 150.245 142.37 149.777 143.514C149.326 144.641 148.694 145.629 147.879 146.478C147.064 147.327 146.12 147.995 145.045 148.48C143.97 148.965 142.818 149.208 141.587 149.208C140.339 149.208 139.178 148.965 138.103 148.48C137.028 147.977 136.084 147.301 135.269 146.452C134.454 145.585 133.813 144.589 133.345 143.462C132.894 142.318 132.669 141.113 132.669 139.848C132.669 138.583 132.903 137.395 133.371 136.286C133.839 135.159 134.489 134.171 135.321 133.322C136.153 132.455 137.106 131.779 138.181 131.294C139.256 130.809 140.391 130.566 141.587 130.566C142.818 130.566 143.962 130.809 145.019 131.294C146.094 131.779 147.038 132.455 147.853 133.322C148.685 134.171 149.326 135.159 149.777 136.286C150.245 137.395 150.479 138.583 150.479 139.848ZM147.255 139.848C147.255 138.704 146.995 137.664 146.475 136.728C145.972 135.792 145.288 135.047 144.421 134.492C143.572 133.92 142.627 133.634 141.587 133.634C140.547 133.634 139.594 133.92 138.727 134.492C137.86 135.064 137.167 135.827 136.647 136.78C136.144 137.716 135.893 138.739 135.893 139.848C135.893 140.992 136.144 142.041 136.647 142.994C137.167 143.947 137.86 144.71 138.727 145.282C139.594 145.854 140.547 146.14 141.587 146.14C142.644 146.14 143.598 145.854 144.447 145.282C145.296 144.71 145.972 143.947 146.475 142.994C146.995 142.023 147.255 140.975 147.255 139.848ZM175.271 149H171.553L167.393 141.902H165.807V149H162.687L162.713 130.8H169.551C170.469 130.8 171.284 131.06 171.995 131.58C172.705 132.1 173.26 132.785 173.659 133.634C174.075 134.466 174.283 135.367 174.283 136.338C174.283 137.066 174.135 137.785 173.841 138.496C173.563 139.189 173.173 139.813 172.671 140.368C172.168 140.923 171.587 141.339 170.929 141.616L175.271 149ZM171.111 136.338C171.111 135.991 171.033 135.636 170.877 135.272C170.721 134.891 170.513 134.57 170.253 134.31C169.993 134.05 169.689 133.92 169.343 133.92H165.807V138.6H169.343C169.689 138.6 169.993 138.487 170.253 138.262C170.513 138.037 170.721 137.751 170.877 137.404C171.033 137.04 171.111 136.685 171.111 136.338ZM201.741 139.848C201.741 141.096 201.516 142.275 201.065 143.384C200.632 144.476 200.017 145.447 199.219 146.296C198.422 147.145 197.486 147.813 196.411 148.298C195.354 148.766 194.21 149 192.979 149H187.493V130.722H192.979C194.227 130.722 195.38 130.965 196.437 131.45C197.512 131.935 198.439 132.603 199.219 133.452C200.017 134.301 200.632 135.272 201.065 136.364C201.516 137.456 201.741 138.617 201.741 139.848ZM198.517 139.848C198.517 138.721 198.275 137.716 197.789 136.832C197.304 135.931 196.637 135.22 195.787 134.7C194.955 134.18 194.019 133.92 192.979 133.92H190.613V145.802H192.979C194.037 145.802 194.981 145.533 195.813 144.996C196.645 144.459 197.304 143.739 197.789 142.838C198.275 141.937 198.517 140.94 198.517 139.848ZM251.254 139.848C251.254 141.148 251.02 142.37 250.552 143.514C250.102 144.641 249.469 145.629 248.654 146.478C247.84 147.327 246.895 147.995 245.82 148.48C244.746 148.965 243.593 149.208 242.362 149.208C241.114 149.208 239.953 148.965 238.878 148.48C237.804 147.977 236.859 147.301 236.044 146.452C235.23 145.585 234.588 144.589 234.12 143.462C233.67 142.318 233.444 141.113 233.444 139.848C233.444 138.583 233.678 137.395 234.146 136.286C234.614 135.159 235.264 134.171 236.096 133.322C236.928 132.455 237.882 131.779 238.956 131.294C240.031 130.809 241.166 130.566 242.362 130.566C243.593 130.566 244.737 130.809 245.794 131.294C246.869 131.779 247.814 132.455 248.628 133.322C249.46 134.171 250.102 135.159 250.552 136.286C251.02 137.395 251.254 138.583 251.254 139.848ZM248.03 139.848C248.03 138.704 247.77 137.664 247.25 136.728C246.748 135.792 246.063 135.047 245.196 134.492C244.347 133.92 243.402 133.634 242.362 133.634C241.322 133.634 240.369 133.92 239.502 134.492C238.636 135.064 237.942 135.827 237.422 136.78C236.92 137.716 236.668 138.739 236.668 139.848C236.668 140.992 236.92 142.041 237.422 142.994C237.942 143.947 238.636 144.71 239.502 145.282C240.369 145.854 241.322 146.14 242.362 146.14C243.42 146.14 244.373 145.854 245.222 145.282C246.072 144.71 246.748 143.947 247.25 142.994C247.77 142.023 248.03 140.975 248.03 139.848ZM273.264 133.972H266.582V138.626H271.99V141.512H266.582V149H263.462V130.8H273.264V133.972ZM305.23 149L305.256 130.8H312.042C312.995 130.8 313.827 131.069 314.538 131.606C315.248 132.126 315.794 132.811 316.176 133.66C316.574 134.492 316.774 135.385 316.774 136.338C316.774 137.014 316.644 137.681 316.384 138.34C316.141 138.999 315.803 139.597 315.37 140.134C314.936 140.671 314.425 141.105 313.836 141.434C313.264 141.746 312.64 141.902 311.964 141.902H308.35V149H305.23ZM308.35 138.834H311.834C312.336 138.834 312.77 138.583 313.134 138.08C313.515 137.56 313.706 136.979 313.706 136.338C313.706 135.627 313.506 135.038 313.108 134.57C312.726 134.102 312.328 133.868 311.912 133.868H308.35V138.834ZM337.549 149H328.995V130.8H332.115V145.932H337.549V149ZM359.567 149H349.765V130.8H359.567V133.712H352.885V138.782H358.293V141.408H352.885V146.088H359.567V149ZM371.519 148.974L377.135 130.8H381.061L386.703 148.974H383.375L382.075 144.58H376.147L374.847 148.974H371.519ZM379.111 134.7L376.979 141.876H381.243L379.111 134.7ZM404.979 149.26C404.199 149.26 403.41 149.139 402.613 148.896C401.833 148.653 401.096 148.324 400.403 147.908C399.727 147.475 399.146 146.998 398.661 146.478L400.975 144.242C401.495 144.779 402.119 145.213 402.847 145.542C403.592 145.871 404.286 146.036 404.927 146.036C405.742 146.036 406.426 145.802 406.981 145.334C407.553 144.849 407.839 144.277 407.839 143.618C407.839 143.081 407.64 142.621 407.241 142.24C406.842 141.841 406.348 141.555 405.759 141.382C404.216 140.966 402.899 140.524 401.807 140.056C400.732 139.588 399.935 138.973 399.415 138.21C398.895 137.447 398.704 136.425 398.843 135.142C398.964 134.137 399.294 133.305 399.831 132.646C400.386 131.97 401.079 131.467 401.911 131.138C402.76 130.809 403.696 130.644 404.719 130.644C405.638 130.644 406.6 130.791 407.605 131.086C408.61 131.363 409.607 131.831 410.595 132.49L408.385 134.778C407.882 134.501 407.336 134.267 406.747 134.076C406.158 133.885 405.551 133.781 404.927 133.764C404.442 133.747 403.974 133.799 403.523 133.92C403.09 134.024 402.726 134.215 402.431 134.492C402.136 134.752 401.98 135.107 401.963 135.558C401.946 136.061 402.076 136.451 402.353 136.728C402.63 137.005 403.012 137.231 403.497 137.404C404 137.577 404.58 137.768 405.239 137.976C406.452 138.305 407.484 138.687 408.333 139.12C409.182 139.536 409.832 140.099 410.283 140.81C410.734 141.503 410.959 142.439 410.959 143.618C410.959 144.675 410.69 145.629 410.153 146.478C409.616 147.327 408.896 148.003 407.995 148.506C407.094 149.009 406.088 149.26 404.979 149.26ZM422.909 148.974L428.525 130.8H432.451L438.093 148.974H434.765L433.465 144.58H427.537L426.237 148.974H422.909ZM430.501 134.7L428.369 141.876H432.633L430.501 134.7ZM463.884 149H459.88L453.432 134.856V148.974H450.312V130.8H454.602L460.764 144.658V130.8H463.884V149ZM489.519 133.66H484.371V149H481.251V133.66H476.103V130.8H489.519V133.66ZM521.482 149V130.8H526.526L530.816 142.292L535.106 130.8H540.15V149H537.03V134.622L532.298 146.4H529.36L524.602 134.622V149H521.482ZM562.438 149H552.636V130.8H562.438V133.712H555.756V138.782H561.164V141.408H555.756V146.088H562.438V149ZM574.65 149V130.8H579.694L583.984 142.292L588.274 130.8H593.318V149H590.198V134.622L585.466 146.4H582.528L577.77 134.622V149H574.65ZM623.354 139.848C623.354 141.148 623.12 142.37 622.652 143.514C622.201 144.641 621.569 145.629 620.754 146.478C619.939 147.327 618.995 147.995 617.92 148.48C616.845 148.965 615.693 149.208 614.462 149.208C613.214 149.208 612.053 148.965 610.978 148.48C609.903 147.977 608.959 147.301 608.144 146.452C607.329 145.585 606.688 144.589 606.22 143.462C605.769 142.318 605.544 141.113 605.544 139.848C605.544 138.583 605.778 137.395 606.246 136.286C606.714 135.159 607.364 134.171 608.196 133.322C609.028 132.455 609.981 131.779 611.056 131.294C612.131 130.809 613.266 130.566 614.462 130.566C615.693 130.566 616.837 130.809 617.894 131.294C618.969 131.779 619.913 132.455 620.728 133.322C621.56 134.171 622.201 135.159 622.652 136.286C623.12 137.395 623.354 138.583 623.354 139.848ZM620.13 139.848C620.13 138.704 619.87 137.664 619.35 136.728C618.847 135.792 618.163 135.047 617.296 134.492C616.447 133.92 615.502 133.634 614.462 133.634C613.422 133.634 612.469 133.92 611.602 134.492C610.735 135.064 610.042 135.827 609.522 136.78C609.019 137.716 608.768 138.739 608.768 139.848C608.768 140.992 609.019 142.041 609.522 142.994C610.042 143.947 610.735 144.71 611.602 145.282C612.469 145.854 613.422 146.14 614.462 146.14C615.519 146.14 616.473 145.854 617.322 145.282C618.171 144.71 618.847 143.947 619.35 142.994C619.87 142.023 620.13 140.975 620.13 139.848ZM648.146 149H644.428L640.268 141.902H638.682V149H635.562L635.588 130.8H642.426C643.344 130.8 644.159 131.06 644.87 131.58C645.58 132.1 646.135 132.785 646.534 133.634C646.95 134.466 647.158 135.367 647.158 136.338C647.158 137.066 647.01 137.785 646.716 138.496C646.438 139.189 646.048 139.813 645.546 140.368C645.043 140.923 644.462 141.339 643.804 141.616L648.146 149ZM643.986 136.338C643.986 135.991 643.908 135.636 643.752 135.272C643.596 134.891 643.388 134.57 643.128 134.31C642.868 134.05 642.564 133.92 642.218 133.92H638.682V138.6H642.218C642.564 138.6 642.868 138.487 643.128 138.262C643.388 138.037 643.596 137.751 643.752 137.404C643.908 137.04 643.986 136.685 643.986 136.338ZM663.488 149H660.368V130.8H663.488V149ZM685.76 149H675.958V130.8H685.76V133.712H679.078V138.782H684.486V141.408H679.078V146.088H685.76V149ZM704.03 149.26C703.25 149.26 702.461 149.139 701.664 148.896C700.884 148.653 700.147 148.324 699.454 147.908C698.778 147.475 698.197 146.998 697.712 146.478L700.026 144.242C700.546 144.779 701.17 145.213 701.898 145.542C702.643 145.871 703.337 146.036 703.978 146.036C704.793 146.036 705.477 145.802 706.032 145.334C706.604 144.849 706.89 144.277 706.89 143.618C706.89 143.081 706.691 142.621 706.292 142.24C705.893 141.841 705.399 141.555 704.81 141.382C703.267 140.966 701.95 140.524 700.858 140.056C699.783 139.588 698.986 138.973 698.466 138.21C697.946 137.447 697.755 136.425 697.894 135.142C698.015 134.137 698.345 133.305 698.882 132.646C699.437 131.97 700.13 131.467 700.962 131.138C701.811 130.809 702.747 130.644 703.77 130.644C704.689 130.644 705.651 130.791 706.656 131.086C707.661 131.363 708.658 131.831 709.646 132.49L707.436 134.778C706.933 134.501 706.387 134.267 705.798 134.076C705.209 133.885 704.602 133.781 703.978 133.764C703.493 133.747 703.025 133.799 702.574 133.92C702.141 134.024 701.777 134.215 701.482 134.492C701.187 134.752 701.031 135.107 701.014 135.558C700.997 136.061 701.127 136.451 701.404 136.728C701.681 137.005 702.063 137.231 702.548 137.404C703.051 137.577 703.631 137.768 704.29 137.976C705.503 138.305 706.535 138.687 707.384 139.12C708.233 139.536 708.883 140.099 709.334 140.81C709.785 141.503 710.01 142.439 710.01 143.618C710.01 144.675 709.741 145.629 709.204 146.478C708.667 147.327 707.947 148.003 707.046 148.506C706.145 149.009 705.139 149.26 704.03 149.26Z" fill="#6B1300"/>
                    </svg>
                </Logo>
                <div>
                    {selectedPlace ? (
                        <>
                            <PlaceContainer>
                                <PlaceSelectBtn type="button" onClick={handleToggleMap}>
                                    <PiMapPinLight />
                                </PlaceSelectBtn>
                                <SelectedPlaceText>
                                    {selectedPlace.name}
                                </SelectedPlaceText>
                            </PlaceContainer>
                        </>
                    ) : (
                        <PlaceContainer>
                            <PlaceSelectBtn type="button" onClick={handleToggleMap}>
                                <PiMapPinLight />
                            </PlaceSelectBtn>
                        </PlaceContainer>
                    )}
                    {showMap && <MapComponent onPlaceSelect={handlePlaceSelect} />} {/* Conditionally render MapComponent */}
                </div>
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
                    <Button  type="submit">
                        <span>PUBLISH</span>
                        {layers}
                    </Button>
                </form>
            </Container>
        </>
    );
}
