import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";
import { useEffect, useState } from "react";

export default function BasicMap({ onPlaceSelect }) {  // onPlaceSelect 콜백 받기
    useKakaoLoader();

    const [info, setInfo] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 상태 추가

    const performSearch = (term) => {
        if (!map || !term) return;

        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(term, (data, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                const newMarkers = [];
                const newPlaces = [];

                data.forEach((place, index) => {
                    const position = {
                        lat: place.y,
                        lng: place.x,
                    };

                    newMarkers.push({
                        position,
                        content: place.place_name,
                        id: index,
                    });

                    newPlaces.push({
                        id: index,
                        name: place.place_name,
                        address: place.road_address_name || place.address_name,
                        phone: place.phone,
                        position,
                    });

                    bounds.extend(new kakao.maps.LatLng(place.y, place.x));
                });

                setMarkers(newMarkers);
                setPlaces(newPlaces);

                map.setBounds(bounds);
            } else {
                alert('Search failed.');
            }
        });
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        performSearch(searchTerm);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        if (map) {
            performSearch(searchTerm);
        }
    }, [map]);

    const handlePlaceClick = (place) => {
        setInfo(place);

        if (map) {
            map.setCenter(new kakao.maps.LatLng(place.position.lat, place.position.lng));
            map.setLevel(5);
        }
    };

    const handleSelectPlace = (place, e) => {
        e.stopPropagation(); // 이벤트 전파 방지
        setSelectedPlace(place); // 선택된 장소 설정
        onPlaceSelect(place); // 선택된 장소 부모 컴포넌트에 전달
    };

    return (
        <div>
            <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for a place..."
                    style={{ padding: "5px" }}
                />
                <button
                    onClick={handleSearchClick}
                    style={{
                        marginLeft: "10px",
                        padding: "5px 10px",
                        cursor: "pointer",
                    }}
                >
                    Search
                </button>
                {selectedPlace && (
                    <div style={{ marginLeft: "20px", fontWeight: "bold" }}>
                        선택된 장소: {selectedPlace.name}
                    </div>
                )}
            </div>
            <Map
                center={{
                    lat: 37.566826,
                    lng: 126.9786567,
                }}
                style={{
                    width: "100%",
                    height: "350px",
                }}
                level={3}
                onCreate={setMap}
            >
                {markers.map((marker) => (
                    <MapMarker
                        key={`marker-${marker.id}`}
                        position={marker.position}
                        onClick={() => setInfo(marker)}
                    >
                        {info && info.id === marker.id && (
                            <div style={{ color: "#000" }}>{marker.content}</div>
                        )}
                    </MapMarker>
                ))}
            </Map>
            <ul id="placesList" style={{ marginTop: "10px", listStyleType: "none", padding: 0 }}>
                {places.map((place) => (
                    <li
                        key={place.id}
                        style={{
                            cursor: "pointer",
                            padding: "5px",
                            borderBottom: "1px solid #ddd",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div onClick={() => handlePlaceClick(place)}>
                            <h5>{place.name}</h5>
                            <span>{place.address}</span>
                            <br />
                        </div>
                        <button
                            type="button"
                            onClick={(e) => handleSelectPlace(place, e)}
                            style={{
                                padding: "5px 10px",
                                cursor: "pointer",
                                backgroundColor: "#6B1300",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                            }}
                        >
                            선택하기
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
