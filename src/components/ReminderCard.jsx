import React, { useEffect, useRef, useState } from "react";

const ReminderCard = () => {
	const cardRef = useRef();
	const [visible, setVisible] = useState(false);
	const [confirmed, setConfirmed] = useState(false);

	useEffect(() => {
		const showReminder = () => {
			setVisible(true);
			setConfirmed(false);
		};

		showReminder();

		const interval = setInterval(() => {
			showReminder();
		}, 30 * 60 * 1000);

		return () => clearInterval(interval);
	}, []);

	const handleConfirm = () => {
		setConfirmed(true);
		setTimeout(() => setVisible(false), 3000);
	};

	if (!visible) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
			<div
				ref={cardRef}
				className="bg-blue-50 border border-blue-300 pointer-events-auto rounded-lg shadow-xl p-6 m-6 w-full max-w-sm text-center"
			>
				<h3 className="text-2xl font-bold text-blue-800 mb-2">
					💧 Time to Hydrate!
				</h3>
				<p className="text-sm text-blue-700 mb-4">
					Staying hydrated helps with energy, focus, and health — drink a glass
					of water now.
				</p>

				{!confirmed ? (
					<button
						onClick={handleConfirm}
						className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
					>
						✅ I drank water
					</button>
				) : (
					<p className="text-green-600 font-medium animate-pulse">
						💧 Great job! You logged your hydration.
					</p>
				)}
			</div>
		</div>
	);
};

export default ReminderCard;
