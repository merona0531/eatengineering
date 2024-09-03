import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";
import { useEffect, useState } from "react";

export default function BasicMap() {
    useKakaoLoader();

    const [info, setInfo] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [places, setPlaces] = useState([]);

    // Function to perform search and update markers and place list
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

    // Handler for the search button click
    const handleSearchClick = () => {
        performSearch(searchTerm);
    };

    // Handler for input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Trigger search when map is set
    useEffect(() => {
        if (map) {
            performSearch(searchTerm);
        }
    }, [map]);

    // Handle click on place from list
    const handlePlaceClick = (place) => {
        setInfo(place);

        if (map) {
            // Center the map on the selected place
            map.setCenter(new kakao.maps.LatLng(place.position.lat, place.position.lng));
            map.setLevel(5); // Optionally adjust the zoom level to fit the marker
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
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
                        onClick={() => handlePlaceClick(place)}
                        style={{
                            cursor: "pointer",
                            padding: "5px",
                            borderBottom: "1px solid #ddd",
                        }}
                    >
                        <h5>{place.name}</h5>
                        <span>{place.address}</span>
                        <br />
                        <span>{place.phone}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
