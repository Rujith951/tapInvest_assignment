import React from "react";
import NetworkStatus from "./components/NetworkStatus";
import "./index.css";
import ReminderCard from "./components/ReminderCard";
import LocationMap from "./components/LocationMap";

function App() {
	return (
		<div className="h-[100vh] w-[100vw] overflow-hidden bg-gray-100 text-gray-800 flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-2xl gap-2 p-6 w-[540px] h-[90vh] flex flex-col items-start ">
				<h1 className="text-3xl font-bold text-center">
					🚶‍♂️ Smart Outdoor Assistant
				</h1>
				<div className="w-full">
					<NetworkStatus />
				</div>
				<div className="flex-1 w-full">
					<LocationMap />
				</div>
				<ReminderCard />
			</div>
		</div>
	);
}

export default App;
