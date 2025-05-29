'use client';

import { useRouter } from 'next/navigation';
import MobileBottomNav from "@/components/MobileBottomNav";

export default function SettingPage() {
	const router = useRouter();

	const handleLogout = () => {
		console.log("User logged out");
		router.push('/login');
		// Your actual logout logic here
	};

	return (
		<>
			<div className="p-6 pb-20"> {/* padding-bottom to prevent content hiding behind nav */}
				<h1 className="text-2xl text-green-600 mb-4">Setting</h1>

				<button
					onClick={handleLogout}
					//className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
					className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-[32px] text-base px-4 py-4 text-center"
				>
					Log Out
				</button>
			</div>

			<MobileBottomNav />
		</>
	);
}