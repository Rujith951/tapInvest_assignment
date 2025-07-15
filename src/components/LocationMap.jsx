import React, { useEffect, useRef, useState } from "react";

const LocationMap = () => {
	const [location, setLocation] = useState(null);
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const pathRef = useRef([]);
	const boundsRef = useRef({
		minLat: null,
		maxLat: null,
		minLng: null,
		maxLng: null,
	});

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;

		if (canvas && container) {
			canvas.width = container.clientWidth;
			canvas.height = 300;
		}
	}, []);

	const latLngToCanvasXY = (lat, lng, width, height) => {
		const { minLat, maxLat, minLng, maxLng } = boundsRef.current;

		const x = ((lng - minLng) / (maxLng - minLng)) * width;
		const y = ((maxLat - lat) / (maxLat - minLat)) * height;

		return { x, y };
	};

	const drawPath = points => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (points.length < 2) return;

		ctx.strokeStyle = "#0077cc";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		points.forEach(pt => ctx.lineTo(pt.x, pt.y));
		ctx.stroke();
	};

	useEffect(() => {
		const updateLocation = position => {
			const { latitude: lat, longitude: lng } = position.coords;
			setLocation({ lat, lng });

			const b = boundsRef.current;
			b.minLat = b.minLat !== null ? Math.min(b.minLat, lat) : lat;
			b.maxLat = b.maxLat !== null ? Math.max(b.maxLat, lat) : lat;
			b.minLng = b.minLng !== null ? Math.min(b.minLng, lng) : lng;
			b.maxLng = b.maxLng !== null ? Math.max(b.maxLng, lng) : lng;

			const canvas = canvasRef.current;
			const point = latLngToCanvasXY(lat, lng, canvas.width, canvas.height);
			pathRef.current.push(point);

			drawPath(pathRef.current);
		};

		const watchId = navigator.geolocation.watchPosition(
			updateLocation,
			error => console.error("Geolocation error:", error),
			{ enableHighAccuracy: true }
		);

		return () => navigator.geolocation.clearWatch(watchId);
	}, []);

	return (
		<div
			ref={containerRef}
			className="bg-white rounded-lg shadow-md p-4 w-full max-w-md mx-auto"
		>
			<h3 className="text-xl font-semibold mb-2">📍 Live Location (Canvas)</h3>
			{location ? (
				<p className="text-sm">
					Latitude: {location.lat.toFixed(6)}, Longitude:{" "}
					{location.lng.toFixed(6)}
				</p>
			) : (
				<p className="text-sm text-gray-500">Fetching location...</p>
			)}

			<canvas
				ref={canvasRef}
				className="mt-4 border border-gray-300 rounded w-full"
			/>
		</div>
	);
};

export default LocationMap;
