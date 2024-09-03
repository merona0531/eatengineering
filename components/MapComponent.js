// src/MapComponent.js
import React, { useEffect, useRef, useState } from 'react';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const loadKakaoMapScript = (appKey) => {
            return new Promise((resolve, reject) => {
                if (window.kakao && window.kakao.maps) {
                    resolve(window.kakao);
                    return;
                }

                const script = document.createElement('script');
                script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
                script.onload = () => {
                    if (window.kakao && window.kakao.maps) {
                        resolve(window.kakao);
                    } else {
                        reject(new Error('Kakao Map API failed to load'));
                    }
                };
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const initializeMap = async () => {
            try {
                // 카카오맵 API 로드
                const kakao = await loadKakaoMapScript('77bcc4551802ffa146ab8e6ec15d7063'); // 여기서 YOUR_APP_KEY를 실제 API 키로 변경하세요

                // 지도 설정
                const mapOptions = {
                    center: new kakao.maps.LatLng(37.5665, 126.978), // 서울
                    level: 3,
                };

                // 지도 생성
                const map = new kakao.maps.Map(mapContainer.current, mapOptions);

                // 예를 들어, 마커 추가
                const markerPosition = new kakao.maps.LatLng(37.5665, 126.978);
                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                });
                marker.setMap(map);

                // 지도 로드 완료 상태 업데이트
                setMapLoaded(true);

            } catch (error) {
                console.error('Error loading Kakao Map API:', error);
            }
        };

        if (!mapLoaded) {
            initializeMap();
        }

    }, [mapLoaded]);

    return (
        <div
            ref={mapContainer}
            style={{ width: '100%', height: '500px' }}
        />
    );
};

export default MapComponent;
