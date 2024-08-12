import { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Container, Wrapper, Input, Logo,
    Label, InputWrapper, Error, Button, SignupBox
}
    from './signupstyle'

export default function Index() {
    const [form, setForm] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const router = useRouter();

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('../api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message);
                return;
            }

            const data = await res.json();
            console.log('Signup successful:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Wrapper>
            <Container>
                <Logo onClick={() => router.push('/')}>
                    <svg width="677" height="110" viewBox="0 0 677 110" fill="none" xmlns="http://www.w3.org/2000/svg" cursor={"pointer"}>
                        <path d="M85.84 42.08C85.7467 42.64 85.6533 43.8067 85.56 45.58C85.56 47.3533 85.42 49.0333 85.14 50.62C85.14 50.9 85.14 51.18 85.14 51.46C85.2333 51.74 85.28 52.0667 85.28 52.44C85.28 57.2 84.6733 60.56 83.46 62.52C82.34 64.3867 80.7067 65.32 78.56 65.32C76.4133 65.32 74.6867 64.8067 73.38 63.78C72.1667 62.7533 71.56 61.3067 71.56 59.44C71.56 58.6 71.6533 57.5267 71.84 56.22C72.0267 54.9133 72.12 53.84 72.12 53C72.12 52.0667 72.0733 51.4133 71.98 51.04C71.98 50.6667 71.98 50.1067 71.98 49.36C71.98 48.6133 72.0267 47.6333 72.12 46.42L72.54 40.26C70.2067 40.26 68.2 40.3533 66.52 40.54C64.84 40.7267 63.16 40.96 61.48 41.24C59.8933 41.52 58.1667 41.7533 56.3 41.94C54.5267 42.1267 52.38 42.22 49.86 42.22C49.02 42.22 48.18 42.22 47.34 42.22C46.5 42.22 45.8 42.1733 45.24 42.08C44.7733 41.8 44.0733 40.9133 43.14 39.42C42.2067 37.9267 41.74 36.34 41.74 34.66C41.74 33.4467 42.3 32.42 43.42 31.58C44.54 30.74 45.8933 30.0867 47.48 29.62C49.16 29.06 50.98 28.6867 52.94 28.5C54.9 28.3133 56.72 28.22 58.4 28.22H59.8C60.08 28.22 60.78 28.1733 61.9 28.08C63.02 27.9867 64.2333 27.8933 65.54 27.8C66.8467 27.7067 68.1533 27.6133 69.46 27.52C70.7667 27.4267 71.7933 27.3333 72.54 27.24C72.4467 25.1867 72.26 23.2267 71.98 21.36C71.7933 19.4933 71.7 18.1867 71.7 17.44V15.48C71.7 13.52 71.56 11.7467 71.28 10.16C71 8.48 70.86 6.98666 70.86 5.68C70.86 4.09333 71.42 2.92666 72.54 2.17999C73.7533 1.33999 75.2467 0.919993 77.02 0.919993C78.6067 0.919993 79.9133 1.10666 80.94 1.47999C81.9667 1.85333 82.8067 2.6 83.46 3.72L84.44 9.18C84.6267 10.2067 84.7667 11.14 84.86 11.98C84.9533 12.82 85 13.6133 85 14.36V15.48C85.28 18.56 85.4667 20.8467 85.56 22.34C85.7467 23.74 85.84 24.7667 85.84 25.42C85.84 26.0733 85.7933 26.54 85.7 26.82C85.7 27.1 85.7 27.66 85.7 28.5C85.7 28.9667 85.6533 29.4333 85.56 29.9C85.56 30.2733 85.5133 30.6933 85.42 31.16C85.6067 31.9067 85.7 33.0267 85.7 34.52C85.7933 36.0133 85.84 37.4133 85.84 38.72V42.08ZM41.6 39.98C41.88 41.0067 42.02 42.0333 42.02 43.06C42.02 44.3667 41.8333 45.72 41.46 47.12C41.0867 48.4267 40.5733 49.7333 39.92 51.04C38.6133 51.32 37.4 51.5067 36.28 51.6C35.16 51.6933 34.04 51.74 32.92 51.74C31.8933 51.74 30.82 51.7867 29.7 51.88C28.58 51.88 27.4133 52.02 26.2 52.3C23.2133 52.86 21.2533 53.14 20.32 53.14H16.68C15.7467 53.14 14.3467 52.9533 12.48 52.58C10.6133 52.1133 8.84 51.6933 7.16 51.32C6.88 50.9467 6.50667 50.2933 6.04 49.36C5.57333 48.3333 5.10667 47.2133 4.64 46C4.26667 44.7867 3.89333 43.5733 3.52 42.36C3.24 41.1467 3.1 40.12 3.1 39.28C3.1 38.9067 3.1 38.5333 3.1 38.16C3.19333 37.7867 3.24 37.4133 3.24 37.04C3.24 35.92 3.1 34.94 2.82 34.1C2.54 33.26 2.30667 32.6067 2.12 32.14C2.12 31.58 2.07333 31.1133 1.98 30.74C1.98 30.3667 1.93333 29.9933 1.84 29.62C1.74667 29.1533 1.60667 28.64 1.42 28.08C1.32667 27.4267 1.14 26.5867 0.860001 25.56C0.673334 25.0933 0.58 24.6267 0.58 24.16C0.58 23.6 0.58 23.04 0.58 22.48C0.58 21.08 0.626667 19.82 0.720001 18.7C0.906667 17.58 1.37333 16.6 2.12 15.76C2.86667 14.92 4.03333 14.3133 5.62 13.94C7.20667 13.4733 9.44667 13.24 12.34 13.24H13.88C14.5333 13.1467 15.2333 13.1 15.98 13.1C16.82 13.0067 17.7533 12.96 18.78 12.96C19.9 12.96 21.0667 13.0067 22.28 13.1C23.4933 13.1933 24.5667 13.4267 25.5 13.8C26.06 14.08 26.8533 14.2667 27.88 14.36C28.9067 14.36 30.0733 14.4067 31.38 14.5C32.6867 14.5933 34.04 14.7333 35.44 14.92C36.9333 15.1067 38.38 15.48 39.78 16.04C40.1533 17.3467 40.48 19.0733 40.76 21.22C41.04 23.3667 41.18 25.6067 41.18 27.94C41.18 28.4067 41.1333 28.8267 41.04 29.2C41.04 29.5733 41.04 29.9933 41.04 30.46C41.04 31.1133 41.04 31.6733 41.04 32.14C41.1333 32.6067 41.2267 33.1667 41.32 33.82C41.4133 34.4733 41.46 35.2667 41.46 36.2C41.5533 37.1333 41.6 38.3933 41.6 39.98ZM62.88 81.7C62.88 82.0733 62.88 82.4467 62.88 82.82C62.9733 83.1933 63.02 83.6133 63.02 84.08C63.02 85.76 62.9733 87.3 62.88 88.7C62.7867 90.1 62.6 91.4533 62.32 92.76C62.1333 93.9733 61.8533 95.2333 61.48 96.54C61.2 97.94 60.78 99.48 60.22 101.16C59.7533 102.467 59.38 103.633 59.1 104.66C58.9133 105.78 58.54 106.667 57.98 107.32C57.5133 108.067 56.86 108.627 56.02 109C55.18 109.373 54.0133 109.56 52.52 109.56C50.7467 109.56 48.74 108.673 46.5 106.9C46.5 104.1 46.8733 101.487 47.62 99.06C48.3667 96.6333 48.74 94.4867 48.74 92.62V91.78C48.8333 91.4067 48.9267 90.8467 49.02 90.1C49.1133 89.26 49.16 88.42 49.16 87.58C49.2533 86.6467 49.3467 85.76 49.44 84.92C49.5333 83.9867 49.58 83.24 49.58 82.68C48.5533 82.4933 47.4333 82.3533 46.22 82.26C45.1 82.0733 43.9333 81.98 42.72 81.98H41.6H40.2C39.2667 81.98 38.24 82.0267 37.12 82.12C36 82.12 35.16 82.2133 34.6 82.4C34.2267 82.4 33.9 82.4 33.62 82.4C33.34 82.3067 33.0133 82.26 32.64 82.26C31.24 82.26 29.98 82.4 28.86 82.68C27.8333 82.8667 26.9 82.96 26.06 82.96C25.4067 82.5867 24.52 81.84 23.4 80.72C22.28 79.5067 21.72 78.2933 21.72 77.08C21.72 75.12 22.56 73.4867 24.24 72.18C26.0133 70.8733 29.0933 69.94 33.48 69.38C33.76 69.4733 34.2267 69.52 34.88 69.52C35.9067 69.52 36.8867 69.4733 37.82 69.38C38.8467 69.1933 39.92 69.1 41.04 69.1C41.5067 69.1 42.02 69.1 42.58 69.1C43.14 69.1 43.6533 69.1933 44.12 69.38C45.0533 69.1933 45.8467 69.1 46.5 69.1C48.5533 69.1 50.98 69.3333 53.78 69.8C56.58 70.1733 59.1933 70.92 61.62 72.04C62.8333 74.3733 63.44 76.3333 63.44 77.92C63.44 79.2267 63.2533 80.4867 62.88 81.7ZM28.72 39.56C28.72 39.0933 28.72 38.6267 28.72 38.16C28.8133 37.6 28.86 37.04 28.86 36.48C28.86 35.5467 28.8133 34.8467 28.72 34.38C28.8133 33.9133 28.86 33.4933 28.86 33.12C28.86 32.6533 28.86 32.1867 28.86 31.72C28.86 30.04 28.72 28.5 28.44 27.1C27.4133 26.9133 26.5267 26.7733 25.78 26.68C25.0333 26.4933 24.2867 26.3533 23.54 26.26C22.8867 26.1667 22.0933 26.12 21.16 26.12C20.32 26.0267 19.2 25.98 17.8 25.98C17.24 25.98 16.6333 26.0267 15.98 26.12C15.42 26.12 14.86 26.12 14.3 26.12C14.3 26.96 14.3467 27.9867 14.44 29.2C14.5333 30.4133 14.6267 31.6733 14.72 32.98C14.9067 34.1933 15.0467 35.4067 15.14 36.62C15.3267 37.8333 15.56 38.86 15.84 39.7C17.0533 39.7 18.1267 39.7933 19.06 39.98C20.0867 40.0733 21.2067 40.12 22.42 40.12H23.4H24.8C26.6667 40.12 27.9733 39.9333 28.72 39.56ZM217.484 43.06L209.504 44.46C208.197 44.6467 206.984 44.8333 205.864 45.02C204.837 45.1133 203.904 45.16 203.064 45.16H202.224L190.044 46.42C189.857 48.94 189.624 51.2733 189.344 53.42C189.157 55.5667 188.784 57.48 188.224 59.16C187.757 60.7467 187.01 62.0067 185.984 62.94C185.05 63.78 183.697 64.2 181.924 64.2C180.057 64.2 178.517 63.92 177.304 63.36C176.09 62.8 175.484 61.6333 175.484 59.86C175.484 59.2067 175.53 58.4133 175.624 57.48C175.717 56.5467 175.81 55.6133 175.904 54.68C175.997 53.6533 176.09 52.72 176.184 51.88C176.37 51.04 176.51 50.34 176.604 49.78C176.604 49.5933 176.557 49.36 176.464 49.08C176.464 48.8 176.464 48.52 176.464 48.24C176.464 47.68 176.464 46.9333 176.464 46C176.557 45.0667 176.604 44.18 176.604 43.34C176.697 42.4067 176.744 41.5667 176.744 40.82C176.837 40.0733 176.884 39.56 176.884 39.28V38.72C176.79 37.4133 176.79 35.92 176.884 34.24C177.07 32.56 177.164 31.1133 177.164 29.9C177.164 28.5 177.024 26.6333 176.744 24.3C176.557 21.8733 176.09 19.0267 175.344 15.76L174.504 11.98C174.317 11.5133 174.177 11.0467 174.084 10.58C173.99 10.1133 173.944 9.64666 173.944 9.18C173.944 7.59333 174.597 6.33333 175.904 5.39999C177.21 4.46666 179.03 3.99999 181.364 3.99999C183.604 3.99999 185.517 4.84 187.104 6.52C187.664 7.73333 188.13 9.27333 188.504 11.14C188.877 12.9133 189.204 14.78 189.484 16.74C189.764 18.6067 189.95 20.4267 190.044 22.2C190.23 23.9733 190.324 25.3733 190.324 26.4C190.324 27.3333 190.277 27.94 190.184 28.22C190.37 28.6867 190.464 29.2 190.464 29.76C190.464 30.2267 190.464 30.74 190.464 31.3V33.4C191.864 33.4 193.124 33.3533 194.244 33.26C195.364 33.0733 196.484 32.8867 197.604 32.7C198.724 32.5133 199.89 32.3733 201.104 32.28C202.317 32.0933 203.67 32 205.164 32H206.424C207.17 31.8133 208.15 31.6733 209.364 31.58C210.577 31.3933 211.79 31.3 213.004 31.3C213.657 31.3 214.404 31.3933 215.244 31.58C216.177 31.6733 217.017 32 217.764 32.56C218.51 33.0267 219.117 33.7733 219.584 34.8C220.144 35.7333 220.424 37.0867 220.424 38.86C220.424 40.54 219.444 41.94 217.484 43.06ZM156.444 29.2C156.35 29.6667 156.304 30.1333 156.304 30.6C156.304 30.9733 156.304 31.3933 156.304 31.86V35.78C156.304 36.5267 156.257 37.2733 156.164 38.02C156.164 38.6733 156.07 39.42 155.884 40.26C155.977 40.7267 156.024 41.38 156.024 42.22C156.024 43.1533 155.93 44.0867 155.744 45.02C155.65 45.9533 155.51 46.9333 155.324 47.96V48.66C155.324 49.6867 155.09 50.8067 154.624 52.02C154.157 53.14 153.644 54.3067 153.084 55.52C150.657 57.0133 148.417 57.76 146.364 57.76C145.337 57.76 144.357 57.62 143.424 57.34C142.21 57.34 141.044 57.3867 139.924 57.48C138.897 57.48 137.824 57.48 136.704 57.48C136.89 57.48 136.19 57.48 134.604 57.48C133.11 57.3867 131.244 57.2933 129.004 57.2C126.857 57.0133 124.664 56.8267 122.424 56.64C120.277 56.36 118.644 56.0333 117.524 55.66C117.43 54.82 117.29 53.5133 117.104 51.74C117.01 49.9667 116.87 48.1933 116.684 46.42C116.59 44.5533 116.497 42.8733 116.404 41.38C116.31 39.8867 116.264 39 116.264 38.72C116.357 38.3467 116.404 37.88 116.404 37.32C116.404 36.76 116.404 36.1067 116.404 35.36V28.92V27.1C116.03 25.98 115.844 24.4867 115.844 22.62C115.844 20.94 115.89 19.4 115.984 18C116.17 16.5067 116.544 15.2 117.104 14.08C117.757 12.8667 118.69 11.7933 119.904 10.86C121.117 9.92667 122.75 9.13333 124.804 8.48C125.924 9.22666 126.904 10.2067 127.744 11.42C128.584 12.6333 129.004 13.7533 129.004 14.78C129.004 15.5267 128.91 16.5533 128.724 17.86C128.63 19.0733 128.537 20.0533 128.444 20.8C128.63 21.1733 128.724 21.5467 128.724 21.92C128.724 22.2933 128.677 22.6667 128.584 23.04C128.584 23.32 128.584 23.6 128.584 23.88H130.404H131.104C131.85 23.6933 132.784 23.5067 133.904 23.32C135.024 23.04 136.05 22.9 136.984 22.9H137.684C138.43 22.7133 139.27 22.62 140.204 22.62C141.23 22.5267 142.21 22.48 143.144 22.48C143.144 20.4267 143.05 18.7933 142.864 17.58C142.77 16.2733 142.63 15.1067 142.444 14.08C142.35 12.96 142.257 11.9333 142.164 11C142.07 9.97333 142.024 8.71333 142.024 7.22C142.397 6.56666 143.144 5.68 144.264 4.56C145.477 3.43999 146.737 2.87999 148.044 2.87999C149.817 2.87999 151.777 3.90666 153.924 5.95999C154.11 7.26666 154.39 8.75999 154.764 10.44C155.137 12.0267 155.324 13.4733 155.324 14.78C155.324 15.34 155.277 15.76 155.184 16.04C155.184 16.6 155.23 17.58 155.324 18.98C155.51 20.38 155.65 21.8267 155.744 23.32C155.93 24.72 156.07 26.0267 156.164 27.24C156.35 28.36 156.444 29.0133 156.444 29.2ZM176.604 90.38C176.604 90.8467 176.37 91.5933 175.904 92.62C175.53 93.5533 175.017 94.58 174.364 95.7C173.71 96.9133 172.964 98.1267 172.124 99.34C171.377 100.647 170.677 101.767 170.024 102.7C167.41 103.447 164.89 104.1 162.464 104.66C160.13 105.22 157.984 105.5 156.024 105.5C154.81 105.5 153.737 105.36 152.804 105.08C152.15 104.893 151.264 104.38 150.144 103.54C149.117 102.7 148.044 101.767 146.924 100.74C145.897 99.7133 144.964 98.7333 144.124 97.8C143.284 96.8667 142.724 96.2133 142.444 95.84C142.07 94.0667 141.744 92.3867 141.464 90.8C141.184 89.12 141.044 87.4867 141.044 85.9C141.044 84.8733 141.044 83.94 141.044 83.1C141.137 82.1667 141.324 81.28 141.604 80.44C141.977 79.6 142.49 78.7133 143.144 77.78C143.797 76.8467 144.684 75.82 145.804 74.7C146.737 73.7667 147.39 73.0667 147.764 72.6C148.23 72.04 148.604 71.6667 148.884 71.48C149.257 71.2 149.677 71.0133 150.144 70.92C150.704 70.8267 151.637 70.7333 152.944 70.64C154.064 70.5467 154.95 70.4533 155.604 70.36C156.257 70.1733 156.724 70.0333 157.004 69.94C157.377 69.7533 157.657 69.6133 157.844 69.52C158.124 69.4267 158.45 69.38 158.824 69.38C159.57 69.38 160.364 69.4733 161.204 69.66C162.044 69.8467 163.024 70.08 164.144 70.36C166.384 71.0133 168.064 71.62 169.184 72.18C170.304 72.74 171.19 73.3933 171.844 74.14C172.497 74.7933 173.104 75.6333 173.664 76.66C174.224 77.5933 175.11 78.8067 176.324 80.3C176.324 80.4867 176.277 80.72 176.184 81C176.184 81.1867 176.184 81.3733 176.184 81.56C176.184 82.4933 176.277 83.7067 176.464 85.2C176.65 86.6 176.744 87.8133 176.744 88.84C176.744 89.12 176.697 89.4 176.604 89.68C176.604 89.96 176.604 90.1933 176.604 90.38ZM143.564 35.08H139.504C136.984 35.08 134.93 35.22 133.344 35.5C131.757 35.78 130.31 35.9667 129.004 36.06C129.004 36.62 129.004 37.2267 129.004 37.88C129.097 38.5333 129.19 39.14 129.284 39.7C129.284 39.8867 129.237 40.0733 129.144 40.26C129.144 40.3533 129.144 40.4933 129.144 40.68C129.144 42.64 129.424 43.76 129.984 44.04C130.544 44.32 131.664 44.46 133.344 44.46C134.184 44.46 134.79 44.4133 135.164 44.32C135.91 44.6 136.75 44.7867 137.684 44.88C138.617 44.9733 139.504 45.02 140.344 45.02C140.81 45.02 141.184 45.02 141.464 45.02C141.837 44.9267 142.164 44.88 142.444 44.88C142.724 43.5733 142.91 42.1267 143.004 40.54C143.097 38.9533 143.284 37.1333 143.564 35.08ZM163.444 84.78C163.35 84.3133 162.884 83.7533 162.044 83.1C161.204 82.4467 160.037 82.12 158.544 82.12C158.357 82.12 158.03 82.1667 157.564 82.26C157.097 82.26 156.584 82.4 156.024 82.68C155.557 82.8667 155.137 83.24 154.764 83.8C154.39 84.36 154.157 85.1533 154.064 86.18C154.157 87.3933 154.39 88.7 154.764 90.1C155.23 91.4067 156.117 92.2933 157.424 92.76C158.357 92.76 159.197 92.76 159.944 92.76C160.69 92.76 161.344 92.62 161.904 92.34C162.464 91.9667 162.884 91.4067 163.164 90.66C163.444 89.82 163.584 88.56 163.584 86.88C163.584 85.6667 163.537 84.9667 163.444 84.78ZM254.068 29.9C252.948 28.78 251.734 27.7067 250.428 26.68C249.121 25.6533 248.281 24.9533 247.908 24.58C247.254 23.74 246.508 23.0867 245.668 22.62C244.828 22.06 243.988 21.5467 243.148 21.08C242.401 20.52 241.748 19.9133 241.188 19.26C240.721 18.5133 240.488 17.5333 240.488 16.32C240.488 15.48 240.581 14.64 240.768 13.8C241.048 12.8667 241.421 12.0267 241.888 11.28C242.448 10.5333 243.054 9.92667 243.708 9.46C244.454 8.99333 245.248 8.75999 246.088 8.75999C246.928 8.75999 247.954 8.99333 249.168 9.46L252.808 11.7C253.928 12.3533 255.048 13.1467 256.168 14.08C257.288 15.0133 258.314 16.04 259.248 17.16C260.181 18.1867 260.928 19.2133 261.488 20.24C262.141 21.1733 262.514 21.9667 262.608 22.62C262.794 23.18 262.888 23.6467 262.888 24.02C262.888 26.0733 261.394 28.22 258.408 30.46C260.368 30.9267 262.141 31.6733 263.728 32.7C265.314 33.6333 266.108 35.2667 266.108 37.6C266.108 39.1867 265.874 40.68 265.408 42.08C265.034 43.3867 264.428 44.5533 263.588 45.58C265.081 46.6067 266.341 47.7267 267.368 48.94C268.394 50.1533 269.234 51.04 269.888 51.6C270.074 51.7867 270.401 52.1133 270.868 52.58C271.334 53.0467 271.801 53.6533 272.268 54.4C272.828 55.1467 273.294 55.9867 273.668 56.92C274.041 57.8533 274.228 58.7867 274.228 59.72C274.228 60.4667 273.994 61.2133 273.528 61.96C273.154 62.7067 272.688 63.4067 272.128 64.06C271.568 64.62 270.961 65.18 270.308 65.74C269.748 66.2067 269.328 66.4867 269.048 66.58C267.554 66.3 266.201 65.7867 264.988 65.04C263.868 64.2 262.794 63.22 261.768 62.1C260.741 60.98 259.714 59.86 258.688 58.74C257.754 57.5267 256.728 56.4533 255.608 55.52C255.141 56.1733 254.628 56.8733 254.068 57.62C253.508 58.2733 253.134 58.9267 252.948 59.58C252.668 59.7667 252.201 60.1867 251.548 60.84C250.988 61.4 250.381 62.1 249.728 62.94C249.168 63.6867 248.654 64.4333 248.188 65.18C247.721 65.9267 247.441 66.5333 247.348 67C245.481 69.6133 244.034 71.5267 243.008 72.74C242.074 73.86 240.908 74.42 239.508 74.42C238.668 74.42 237.828 74.1867 236.988 73.72C236.148 73.16 235.354 72.6 234.608 72.04C233.954 71.3867 233.394 70.78 232.928 70.22C232.554 69.5667 232.368 69.1 232.368 68.82C232.554 67.2333 233.254 65.5067 234.468 63.64C235.774 61.68 236.848 59.9533 237.688 58.46L245.248 47.26C245.714 46.7933 246.368 46.0467 247.208 45.02C248.141 43.9 248.981 42.8267 249.728 41.8C248.981 41.6133 248.234 41.4733 247.488 41.38C246.741 41.1933 245.994 41.1 245.248 41.1H244.688C243.568 40.7267 242.448 40.54 241.328 40.54H238.808C237.688 40.54 236.381 40.4 234.888 40.12C233.394 39.84 231.621 39.4667 229.568 39C228.541 37.2267 228.028 35.64 228.028 34.24C228.028 33.4 228.214 32.6067 228.588 31.86C229.054 31.1133 229.568 30.46 230.128 29.9C230.688 29.2467 231.248 28.7333 231.808 28.36C232.368 27.8933 232.741 27.6133 232.928 27.52C236.101 27.52 238.714 27.6133 240.768 27.8C242.821 27.8933 244.594 28.08 246.088 28.36C247.581 28.5467 248.934 28.78 250.148 29.06C251.361 29.34 252.668 29.62 254.068 29.9ZM315.528 58.18C315.528 58.2733 315.481 58.7867 315.388 59.72C315.388 60.6533 315.341 61.7267 315.248 62.94C315.248 64.1533 315.201 65.3667 315.108 66.58C315.014 67.7 314.921 68.54 314.828 69.1C314.828 69.4733 314.828 69.8467 314.828 70.22C314.921 70.5933 314.968 71.0133 314.968 71.48C314.968 77.2667 314.408 81.1867 313.288 83.24C312.168 85.2 310.394 86.18 307.968 86.18C303.394 86.18 301.108 84.0333 301.108 79.74C301.108 78.62 301.201 77.1733 301.388 75.4C301.574 73.6267 301.668 72.2733 301.668 71.34V69.52C301.668 69.4267 301.668 68.6333 301.668 67.14C301.761 65.6467 301.808 63.9667 301.808 62.1C301.901 60.14 301.948 58.2267 301.948 56.36C302.041 54.4933 302.088 53.14 302.088 52.3C300.408 52.3 298.821 52.3933 297.328 52.58C295.928 52.7667 294.481 53 292.988 53.28C291.494 53.4667 289.908 53.6533 288.228 53.84C286.641 54.0267 284.821 54.12 282.768 54.12C281.741 54.12 280.761 54.12 279.828 54.12C278.894 54.12 278.101 54.0733 277.448 53.98C276.981 53.7 276.281 52.86 275.348 51.46C274.414 49.9667 273.948 48.4267 273.948 46.84C273.948 45.0667 274.881 43.62 276.748 42.5L284.728 40.96C285.941 40.7733 287.061 40.6333 288.088 40.54C289.114 40.4467 290.001 40.4 290.748 40.4H292.008C292.848 40.2133 294.294 40.0733 296.348 39.98C298.494 39.7933 300.314 39.6533 301.808 39.56C301.808 37.9733 301.714 36.8067 301.528 36.06C301.434 35.3133 301.388 34.6133 301.388 33.96V32.14C301.388 30.2733 301.248 28.5 300.968 26.82C300.688 25.14 300.548 23.6467 300.548 22.34C300.548 20.8467 301.108 19.7267 302.228 18.98C303.441 18.14 304.934 17.72 306.708 17.72C308.294 17.72 309.601 17.9067 310.628 18.28C311.654 18.6533 312.494 19.4 313.148 20.52L314.128 25.84C314.314 26.8667 314.454 27.7533 314.548 28.5C314.641 29.2467 314.688 29.9933 314.688 30.74V31.86C314.968 34.94 315.154 37.2267 315.248 38.72C315.434 40.12 315.528 41.1467 315.528 41.8C315.528 42.4533 315.481 42.92 315.388 43.2C315.388 43.3867 315.388 43.9 315.388 44.74C315.388 45.2067 315.341 45.6733 315.248 46.14C315.248 46.5133 315.201 46.9333 315.108 47.4C315.294 48.1467 315.388 49.22 315.388 50.62C315.481 52.02 315.528 53.3733 315.528 54.68V58.18ZM424.351 52.72C424.538 53.1867 424.631 53.6533 424.631 54.12C424.631 54.5867 424.631 55.1 424.631 55.66C424.631 56.1267 424.631 56.64 424.631 57.2C424.631 57.6667 424.585 58.18 424.491 58.74L423.791 63.92V65.04C423.791 66.6267 423.698 68.26 423.511 69.94C423.418 71.62 423.091 73.2067 422.531 74.7C422.065 76.1 421.411 77.2667 420.571 78.2C419.731 79.1333 418.611 79.6 417.211 79.6C414.785 79.6 413.105 78.9467 412.171 77.64C411.238 76.3333 410.771 74.98 410.771 73.58C410.771 72.0867 410.818 70.92 410.911 70.08C411.098 69.1467 411.238 68.1667 411.331 67.14C411.518 66.02 411.658 64.62 411.751 62.94C411.938 61.26 412.031 58.8333 412.031 55.66C412.031 54.9133 412.031 54.3533 412.031 53.98C412.031 53.5133 411.985 53.0933 411.891 52.72C411.798 52.3467 411.705 51.88 411.611 51.32C411.611 50.76 411.611 49.9667 411.611 48.94C411.611 46.7933 411.751 44.9267 412.031 43.34C411.751 42.0333 411.565 40.4467 411.471 38.58C411.471 36.62 411.331 35.2667 411.051 34.52C410.958 33.4933 410.865 32.3733 410.771 31.16C410.678 29.8533 410.631 28.6867 410.631 27.66C410.631 25.7933 411.238 24.44 412.451 23.6C413.758 22.76 415.438 22.34 417.491 22.34C419.731 22.34 421.411 23.1333 422.531 24.72C422.811 26.8667 423.138 29.0133 423.511 31.16C423.978 33.3067 424.211 35.22 424.211 36.9C424.211 37.74 424.165 38.3467 424.071 38.72C424.258 39.7467 424.398 40.82 424.491 41.94C424.585 42.9667 424.631 44.04 424.631 45.16C424.631 46.4667 424.585 47.82 424.491 49.22C424.398 50.5267 424.351 51.6933 424.351 52.72ZM387.111 64.62C387.765 65.6467 388.091 66.6267 388.091 67.56C388.091 69.52 387.578 71.2933 386.551 72.88C385.525 74.3733 384.638 75.2133 383.891 75.4C383.611 75.4 383.331 75.4 383.051 75.4C382.771 75.3067 382.445 75.26 382.071 75.26C381.231 75.26 380.205 75.3067 378.991 75.4C377.871 75.4 376.611 75.4 375.211 75.4C373.531 75.4 371.665 75.3533 369.611 75.26C367.651 75.1667 365.505 74.8867 363.171 74.42L350.431 72.74C349.311 72.6467 348.331 72.3667 347.491 71.9C346.745 71.4333 345.438 70.6867 343.571 69.66C342.825 68.0733 342.218 66.72 341.751 65.6C341.285 64.3867 341.051 63.36 341.051 62.52C341.051 62.3333 341.145 61.6333 341.331 60.42C341.611 59.1133 341.891 57.7133 342.171 56.22C342.451 54.7267 342.731 53.3267 343.011 52.02C343.291 50.62 343.431 49.7333 343.431 49.36C343.431 49.1733 343.385 49.0333 343.291 48.94C343.291 48.8467 343.291 48.7067 343.291 48.52C343.291 47.12 343.618 45.58 344.271 43.9C345.018 42.1267 345.765 40.82 346.511 39.98C346.885 39.7933 347.491 39.6533 348.331 39.56C349.171 39.4667 350.058 39.42 350.991 39.42C351.925 39.3267 352.811 39.1867 353.651 39C354.491 38.8133 355.145 38.58 355.611 38.3C357.198 38.3 358.691 38.2067 360.091 38.02C361.585 37.8333 362.985 37.74 364.291 37.74C364.571 37.74 364.851 37.7867 365.131 37.88C365.411 37.88 365.691 37.88 365.971 37.88C366.625 37.6933 367.231 37.6 367.791 37.6C368.445 37.6 369.005 37.5067 369.471 37.32C369.938 37.1333 370.311 36.76 370.591 36.2C370.965 35.64 371.245 34.7067 371.431 33.4C370.218 33.2133 368.958 32.98 367.651 32.7C366.345 32.3267 365.411 32.0467 364.851 31.86L357.991 31.3C356.685 31.1133 355.471 30.9733 354.351 30.88C353.231 30.6933 352.251 30.4133 351.411 30.04C350.665 29.5733 350.058 28.9667 349.591 28.22C349.125 27.38 348.891 26.2133 348.891 24.72C348.891 21.7333 350.105 19.4933 352.531 18C353.838 18.4667 355.378 18.7467 357.151 18.84C358.925 18.9333 360.325 19.1667 361.351 19.54C362.565 19.6333 363.731 19.7733 364.851 19.96C366.065 20.0533 367.045 20.1 367.791 20.1H368.351C368.818 20.1 370.918 20.4733 374.651 21.22L383.191 22.9C384.125 23.8333 384.685 24.9067 384.871 26.12C385.151 27.24 385.291 28.3133 385.291 29.34C385.291 31.7667 384.871 34.7533 384.031 38.3C383.191 41.8467 381.931 45.0667 380.251 47.96C379.318 48.3333 377.918 48.6133 376.051 48.8C374.278 48.9867 373.065 49.22 372.411 49.5H370.031C368.445 49.5 366.438 49.64 364.011 49.92C361.678 50.2 359.251 50.5733 356.731 51.04C355.985 52.72 355.425 54.4933 355.051 56.36C354.771 58.1333 354.631 59.58 354.631 60.7C355.191 60.8867 355.891 61.0733 356.731 61.26C357.571 61.3533 358.458 61.4933 359.391 61.68C360.418 61.8667 361.398 62.0067 362.331 62.1C363.265 62.1933 364.011 62.24 364.571 62.24C364.851 62.24 365.085 62.24 365.271 62.24C365.458 62.1467 365.645 62.1 365.831 62.1C366.485 62.2867 367.045 62.4267 367.511 62.52C368.071 62.6133 368.631 62.7067 369.191 62.8C369.845 62.8 370.545 62.8467 371.291 62.94C372.131 62.94 373.205 62.94 374.511 62.94L380.811 63.5C382.398 63.6867 383.705 63.8267 384.731 63.92C385.851 64.0133 386.645 64.2467 387.111 64.62ZM534.995 52.44C535.182 52.9067 535.275 53.3733 535.275 53.84C535.275 54.3067 535.275 54.82 535.275 55.38C535.275 55.8467 535.275 56.36 535.275 56.92C535.275 57.3867 535.228 57.9 535.135 58.46L534.435 63.78V65.32C534.435 70.08 533.828 73.6733 532.615 76.1C531.495 78.4333 529.908 79.6 527.855 79.6C525.708 79.6 524.075 78.9933 522.955 77.78C521.928 76.4733 521.415 75.12 521.415 73.72C521.415 72.2267 521.462 71.0133 521.555 70.08C521.742 69.1467 521.928 68.12 522.115 67C522.302 65.88 522.442 64.48 522.535 62.8C522.722 61.0267 522.815 58.5533 522.815 55.38C522.815 54.6333 522.768 54.0733 522.675 53.7C522.675 53.2333 522.628 52.7667 522.535 52.3C522.442 51.74 522.348 51.0867 522.255 50.34C522.255 49.5933 522.255 48.52 522.255 47.12C522.255 46.28 522.302 45.5333 522.395 44.88C522.488 44.1333 522.628 43.48 522.815 42.92C522.442 41.6133 522.255 40.0267 522.255 38.16C522.255 36.2 522.068 34.8467 521.695 34.1C521.602 33.0733 521.508 31.9533 521.415 30.74C521.322 29.4333 521.275 28.2667 521.275 27.24C521.275 25.28 521.928 23.9267 523.235 23.18C524.542 22.34 526.222 21.92 528.275 21.92C530.422 21.92 532.055 22.6667 533.175 24.16C533.455 26.3067 533.782 28.5 534.155 30.74C534.622 32.8867 534.855 34.8 534.855 36.48C534.855 37.32 534.808 37.9267 534.715 38.3C534.902 39.3267 535.042 40.4 535.135 41.52C535.228 42.5467 535.275 43.62 535.275 44.74C535.275 46.14 535.228 47.54 535.135 48.94C535.042 50.2467 534.995 51.4133 534.995 52.44ZM497.895 36.48C498.175 37.88 498.315 39.14 498.315 40.26C498.315 42.3133 497.708 44.6 496.495 47.12C495.375 49.5467 494.255 51.6467 493.135 53.42C492.482 54.82 491.595 56.5933 490.475 58.74C489.448 60.7933 488.002 62.94 486.135 65.18C485.948 65.74 485.622 66.3933 485.155 67.14C484.688 67.8867 484.128 68.6333 483.475 69.38C482.915 70.0333 482.308 70.7333 481.655 71.48C481.095 72.1333 480.628 72.74 480.255 73.3C478.762 73.6733 477.315 73.86 475.915 73.86C474.888 73.86 474.048 73.6733 473.395 73.3C472.742 72.8333 472.182 72.2733 471.715 71.62C471.342 70.9667 471.015 70.22 470.735 69.38C470.548 68.54 470.315 67.6533 470.035 66.72C471.062 65.2267 471.902 64.0133 472.555 63.08C473.302 62.0533 473.908 61.1667 474.375 60.42C474.935 59.6733 475.402 58.9733 475.775 58.32C476.148 57.6667 476.568 56.92 477.035 56.08C479.088 54.0267 480.675 51.88 481.795 49.64C482.915 47.4 483.615 45.7667 483.895 44.74C483.055 44.5533 482.028 44.3667 480.815 44.18C479.602 43.9 478.528 43.76 477.595 43.76H477.035C475.915 43.3867 474.795 43.2 473.675 43.2H471.155C469.942 43.2 468.635 43.06 467.235 42.78C465.835 42.5 464.108 42.1267 462.055 41.66C461.028 39.8867 460.515 38.3 460.515 36.9C460.515 36.06 460.702 35.2667 461.075 34.52C461.542 33.68 462.055 32.98 462.615 32.42C463.175 31.86 463.735 31.3933 464.295 31.02C464.855 30.6467 465.228 30.4133 465.415 30.32C468.682 30.32 471.342 30.4133 473.395 30.6C475.542 30.6933 477.362 30.88 478.855 31.16C480.348 31.3467 481.702 31.58 482.915 31.86C484.128 32.14 485.482 32.42 486.975 32.7C488.935 32.7 490.802 33.0733 492.575 33.82C494.348 34.4733 496.122 35.36 497.895 36.48ZM674.059 59.16L666.079 60.7C664.772 60.8867 663.559 61.0267 662.439 61.12C661.412 61.2133 660.525 61.26 659.779 61.26H658.799L646.619 62.52C646.339 67.3733 646.059 71.2933 645.779 74.28C645.499 77.2667 645.079 79.6 644.519 81.28C643.959 82.96 643.165 84.08 642.139 84.64C641.205 85.2 639.992 85.48 638.499 85.48C636.725 85.48 635.185 85.2 633.879 84.64C632.665 84.08 632.059 82.8667 632.059 81C632.059 80.5333 632.059 79.9733 632.059 79.32C632.152 78.6667 632.245 77.9667 632.339 77.22L633.179 71.2C633.179 71.0133 633.132 70.78 633.039 70.5C633.039 70.22 633.039 69.94 633.039 69.66C633.039 69.1 633.039 68.4 633.039 67.56C633.132 66.6267 633.179 65.6933 633.179 64.76C633.272 63.8267 633.319 63.0333 633.319 62.38C633.412 61.6333 633.459 61.12 633.459 60.84V60.28V54.54C633.552 52.9533 633.599 51.6933 633.599 50.76C633.692 49.7333 633.739 48.94 633.739 48.38C633.739 48.1 633.692 47.54 633.599 46.7C633.505 45.86 633.412 44.9733 633.319 44.04C633.225 43.0133 633.132 42.0333 633.039 41.1C632.945 40.0733 632.899 39.2333 632.899 38.58C632.899 38.3 632.899 38.02 632.899 37.74C632.992 37.46 633.039 37.2267 633.039 37.04C632.852 36.5733 632.665 35.9667 632.479 35.22C632.292 34.38 632.105 33.4467 631.919 32.42L631.079 28.5C630.892 28.0333 630.752 27.5667 630.659 27.1C630.565 26.6333 630.519 26.1667 630.519 25.7C630.519 22.4333 632.945 20.8 637.799 20.8C640.225 20.8 642.185 21.5933 643.679 23.18C644.239 24.4867 644.705 26.0267 645.079 27.8C645.545 29.5733 645.872 31.3933 646.059 33.26C646.339 35.1267 646.525 36.9 646.619 38.58C646.805 40.26 646.899 41.66 646.899 42.78C646.899 43.7133 646.852 44.32 646.759 44.6C646.945 45.0667 647.039 45.5333 647.039 46C647.039 46.4667 647.039 46.98 647.039 47.54V49.78C648.439 49.78 649.699 49.7333 650.819 49.64C652.032 49.4533 653.199 49.2667 654.319 49.08C655.439 48.8 656.559 48.6133 657.679 48.52C658.892 48.3333 660.245 48.24 661.739 48.24H662.999C663.745 48.0533 664.679 47.9133 665.799 47.82C666.919 47.7267 668.132 47.68 669.439 47.68C670.092 47.68 670.839 47.7267 671.679 47.82C672.612 47.9133 673.452 48.1933 674.199 48.66C675.039 49.1267 675.692 49.8733 676.159 50.9C676.719 51.8333 676.999 53.1867 676.999 54.96C676.999 56.64 676.019 58.04 674.059 59.16ZM615.959 57.2C616.145 57.9467 616.239 58.46 616.239 58.74C616.239 59.4867 616.005 60.28 615.539 61.12C615.072 61.8667 614.512 62.5667 613.859 63.22C613.205 63.8733 612.552 64.48 611.899 65.04C611.245 65.5067 610.779 65.7867 610.499 65.88C608.912 65.6 607.465 64.9933 606.159 64.06C604.945 63.1267 603.732 62.0533 602.519 60.84C601.585 60.28 600.699 59.4867 599.859 58.46C599.112 57.34 598.085 56.3133 596.779 55.38C596.312 55.1933 595.985 55.0533 595.799 54.96C595.705 54.8667 595.425 54.4933 594.959 53.84C594.492 54.5867 593.979 55.38 593.419 56.22C592.859 56.9667 592.485 57.62 592.299 58.18C591.645 58.46 590.945 58.9733 590.199 59.72C589.545 60.4667 589.172 61.3067 589.079 62.24C588.145 63.5467 587.352 64.6667 586.699 65.6C586.139 66.44 585.579 67.14 585.019 67.7C584.552 68.26 584.039 68.68 583.479 68.96C582.919 69.1467 582.312 69.24 581.659 69.24C580.819 69.24 579.979 69.0067 579.139 68.54C578.299 68.0733 577.505 67.56 576.759 67C576.105 66.3467 575.545 65.74 575.079 65.18C574.705 64.5267 574.519 64.06 574.519 63.78C574.705 62.1 575.125 60.6067 575.779 59.3C576.525 57.9 577.365 56.5467 578.299 55.24C579.325 53.9333 580.399 52.58 581.519 51.18C582.732 49.78 583.899 48.1467 585.019 46.28C585.765 45.2533 586.325 44.5533 586.699 44.18C587.072 43.7133 587.445 43.2933 587.819 42.92C588.192 42.4533 588.612 41.8467 589.079 41.1C589.639 40.3533 590.479 39.1867 591.599 37.6C592.532 36.2 593.232 35.1267 593.699 34.38C594.165 33.6333 594.585 33.0733 594.959 32.7C595.425 32.3267 595.892 32.14 596.359 32.14C596.919 32.0467 597.759 32 598.879 32C600.839 32 602.425 32.3733 603.639 33.12C604.852 33.7733 605.832 34.94 606.579 36.62C606.485 37.5533 606.019 38.8133 605.179 40.4C604.432 41.9867 603.685 43.2467 602.939 44.18C603.405 44.74 603.872 45.2533 604.339 45.72C604.805 46.1867 605.459 46.7467 606.299 47.4C607.045 48.7067 607.792 49.64 608.539 50.2C609.379 50.76 610.172 51.2733 610.919 51.74C611.759 52.2067 612.599 52.8133 613.439 53.56C614.279 54.3067 615.119 55.52 615.959 57.2Z" fill="#FFBD43"/>
                    </svg>
                </Logo>
                <SignupBox>
                    <form onSubmit={handleSubmit}>
                        <InputWrapper>
                            <Label htmlFor="name">이름</Label>
                            <Input type="text" id="name" name="name" value={form.name} onChange={handleChange} />
                        </InputWrapper>
                        <InputWrapper>
                            <Label htmlFor="username">아이디</Label>
                            <Input type="text" id="username" name="username" value={form.username} onChange={handleChange} />
                        </InputWrapper>
                        <InputWrapper>
                            <Label htmlFor="password">비밀번호</Label>
                            <Input type="password" id="password" name="password" value={form.password} onChange={handleChange} />
                        </InputWrapper>
                        <InputWrapper>
                            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                            <Input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
                        </InputWrapper>
                        <Button type="submit">회원가입</Button>
                        {error && <Error>{error}</Error>}
                    </form>
                </SignupBox>
            </Container>
        </Wrapper>
    );
}
