import React, { useEffect, useState, useRef } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	Polyline,
} from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "400px",
};

const LocationMap = () => {
	const [path, setPath] = useState([]);
	const [currentPos, setCurrentPos] = useState(null);
	const mapRef = useRef(null);

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // make sure it's in your .env
	});

	useEffect(() => {
		if (!navigator.geolocation) {
			alert("Geolocation is not supported by your browser");
			return;
		}

		const watchId = navigator.geolocation.watchPosition(
			position => {
				const { latitude, longitude } = position.coords;
				const newPos = { lat: latitude, lng: longitude };
				setCurrentPos(newPos);
				setPath(prev => [...prev, newPos]);
			},
			error => {
				console.error("Geolocation error:", error);
				alert("Failed to get your location. Please allow GPS access.");
			},
			{
				enableHighAccuracy: true,
				maximumAge: 1000,
				timeout: 10000,
			}
		);

		return () => navigator.geolocation.clearWatch(watchId);
	}, []);

	if (!isLoaded) return <p className="text-center">🗺️ Loading Map...</p>;

	return (
		<div className="w-full">
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={currentPos || { lat: 20.5937, lng: 78.9629 }} // fallback: center of India
				zoom={currentPos ? 17 : 5}
				onLoad={map => (mapRef.current = map)}
			>
				{currentPos && <Marker position={currentPos} />}
				{path.length > 1 && (
					<Polyline
						path={path}
						options={{
							strokeColor: "#0077cc",
							strokeOpacity: 0.8,
							strokeWeight: 4,
						}}
					/>
				)}
			</GoogleMap>
		</div>
	);
};

export default LocationMap;
