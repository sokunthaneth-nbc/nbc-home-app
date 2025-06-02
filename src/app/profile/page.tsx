'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import MobileBottomNav from "@/components/MobileBottomNav";
import DarkModeToggle from '@/components/DarkModeToggle';

export default function ProfilePage() {
	const router = useRouter();
	const [showLogoutPopup, setShowLogoutPopup] = useState(false);
	const [animateIn, setAnimateIn] = useState(false);

	const handleLogout = () => {
		console.log("User logged out");
		router.push('/login');
	};

	const profileData = [
		{ label: 'ថ្ងៃខែឆ្នាំកំណើត', value: '11/11/1911' },
		{ label: 'លេខទូរស័ព្ទ', value: '+855 (87) 575 857' },
		{ label: 'អ៊ីមែល', value: 'mishel.matmorsell@nbc.gov.kh' },
		{ label: 'លេខសម្គាល់ NBC', value: '2659' },
		{ label: 'នាយកដ្ឋាន', value: 'ពត៏មានវិទ្យា' },
		{ label: 'មុខតំណែង', value: 'បុគ្គលិក' },
		{ label: 'ក្របខណ្ឌ', value: 'ខ' },
		{ label: 'ឋាន:', value: '៤' },
	];

	const openLogoutPopup = () => {
		setShowLogoutPopup(true);
		setTimeout(() => setAnimateIn(true), 20);
	};

	const closeLogoutPopup = () => {
		setAnimateIn(false);
		setTimeout(() => setShowLogoutPopup(false), 500);
	};

	return (
		<>
			<main className="p-4 pb-20 space-y-4">
				<div className="max-w-md mx-auto">
					<h2 className="text-[26px] font-[600] text-center mb-4 text-[#001346] dark:text-white">ប្រវត្តិរូប</h2>
					<p className="text-[#001346] dark:text-white mb-2">
						<span className="text-[16px] font-[400] leading-normal">ជំរាបសួរ</span><br />
						<span className="italic text-[26px] font-[600]">ទេព វណ្ណា</span>
					</p>

					<h2 className="text-[20px] font-[600] text-[#001346] dark:text-white leading-normal mb-2">ព័ត៌មានរបស់អ្នក</h2>
					<table className="w-full table-fixed text-sm text-[#001346] dark:text-white divide-y dark:divide-gray-700">
						<tbody>
							{profileData.map((item, index) => (
								<tr key={index} className="h-[56px] border-b border-[#00134608] dark:border-white">
									<td className="text-[15px] font-[600] leading-normal">{item.label}</td>
									<td className="text-[15px] w-[65%] font-[400] leading-normal text-right">{item.value}</td>
								</tr>
							))}
						</tbody>
					</table>

					<h2 className="text-[20px] font-[600] text-[#001346] dark:text-white leading-normal mt-6 mb-2">ការកំណត់គណនី</h2>
					<table className="w-full text-sm text-[#001346] dark:text-white divide-y dark:divide-gray-700">
						<tbody>
							<tr className="h-[56px] border-b border-[#00134608] dark:border-white">
								<td className="text-[16px] font-[400] leading-normal">បើកកម្មវិធីដោយប្រើជីវមាត្រ</td>
								<td className="text-right">
									<label className="inline-flex items-center cursor-pointer relative">
										<input type="checkbox" value="" className="sr-only peer" />
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-400 peer-checked:bg-blue-600"></div>
									</label>
								</td>
							</tr>
							<tr className="h-[56px] border-b border-[#00134608] dark:border-white">
								<td className="text-[16px] font-[400] leading-normal">ប្តូរទៅងងឹត</td>
								<td className="text-right">
									<DarkModeToggle />
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Logout Button */}
				<button
					onClick={openLogoutPopup}
					className="w-full text-white text-[16px] font-[600] bg-[#f24444] dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 h-[40px] rounded-[32px] px-4 py-[8px] text-center"
				>
					ចេញពីគណនី
				</button>

				{/* Logout Popup */}
				{showLogoutPopup && (
					<div
						className={`fixed inset-0 z-50 flex items-end pb-[64px] bg-black/40 transition-opacity duration-500 ${animateIn ? "opacity-100" : "opacity-0"}`}
					>
						<div
							className={`w-full bg-white dark:bg-[#111827] rounded-t-[16px] p-4 transition-all duration-500 ease-in-out transform ${
								animateIn ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
							}`}
						>
							<div className="flex justify-center">
								<img src="/images/logout.png" width={209} height={196} alt="Change Languages" />
							</div>

							<div className="flex flex-col items-center w-full">
								<h2 className="text-[23px] font-[600] text-[#001346] dark:text-white text-center w-full">
									ចេញពីគណនីនេះ?
								</h2>
								<p className="text-[16px] font-[400] text-[#001346] dark:text-gray-300 leading-normal text-center w-full mt-2">
									ពេលចេញពីគណនី អ្នកអាចចូលម្តងទៀតដោយប្រើលេខសម្គាល់ NBC និងពាក្យសម្ងាត់។
								</p>

								<button
									onClick={handleLogout}
									className="w-full mt-[15px] h-[40px] px-[16px] py-[8px] leading-normal text-[16px] font-[600] text-white bg-[#f24444] dark:bg-red-600 rounded-[32px] text-center"
								>
									ចេញពីគណនី
								</button>

								<button
									onClick={closeLogoutPopup}
									className="w-full mt-[8px] h-[40px] px-[16px] py-[8px] leading-normal text-[16px] font-[600] text-[#001346] dark:text-[#001346] bg-[rgba(0,19,70,0.05)] dark:bg-gray-700 rounded-[32px] text-center"
								>
									បោះបង់
								</button>
							</div>
						</div>
					</div>
				)}
			</main>
			<MobileBottomNav />
		</>
	);
}