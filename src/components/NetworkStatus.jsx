import React, { useEffect, useState } from "react";

const NetworkStatus = () => {
	const [networkInfo, setNetworkInfo] = useState(null);

	useEffect(() => {
		const connection =
			navigator.connection ||
			navigator.mozConnection ||
			navigator.webkitConnection;

		if (connection) {
			const updateStatus = () => {
				setNetworkInfo({
					type: connection.effectiveType,
					downlink: connection.downlink,
				});

				if (connection.downlink < 0.5 || connection.effectiveType === "2g") {
					alert("⚠️ Weak network detected!");
				}
			};

			updateStatus();
			connection.addEventListener("change", updateStatus);

			return () => connection.removeEventListener("change", updateStatus);
		}
	}, []);

	return (
		<div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md mx-auto">
			<h3 className="text-xl font-semibold mb-2">📶 Network Info</h3>
			{networkInfo ? (
				<p className="text-sm">
					Type: {networkInfo.type}, Downlink: {networkInfo.downlink} Mbps
				</p>
			) : (
				<p className="text-sm text-gray-500">Network info not available.</p>
			)}
		</div>
	);
};

export default NetworkStatus;
