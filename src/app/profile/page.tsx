'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import MobileBottomNav from "@/components/MobileBottomNav";

export default function ProfilePage() {
	const router = useRouter();
	//const [showLangPopup, setShowLangPopup] = useState(false);
	const [showLogoutPopup, setShowLogoutPopup] = useState(false);
	const [animateIn, setAnimateIn] = useState(false);

	//Function Logout
	const handleLogout = () => {
		console.log("User logged out");
		router.push('/login');
		// Your actual logout logic here
	};

	//Sample ProfileData
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

	//Function Show Logout Popup
	const openLogoutPopup = () => {
		setShowLogoutPopup(true);
		// Delay to ensure component is mounted before applying animation
		setTimeout(() => setAnimateIn(true), 20);
	};

	//Function Close Logout Popup
	const closeLogoutPopup = () => {
		setAnimateIn(false);
		// Wait for the animation to finish before unmounting
		setTimeout(() => setShowLogoutPopup(false), 500);
	};

	return (
		<>
			<main className=" p-4 pb-20 space-y-4">
				<div className=" max-w-md mx-auto">
					<h2 className="text-[26px] font-[600] text-[#001346] text-center mb-4">ប្រវត្តិរូប</h2>
					<p className="text-[#001346] mb-2">
						<span className='text-[16px] font-[400] leading-normal'>ជំរាបសួរ</span><br />
						<span className="italic text-[26px] font-[600]">ទេព វណ្ណា</span>
					</p>

					{/* Your information */}
					<h2 className="text-[20px] font-[600] text-[#001346] leading-normal mb-2">ព័ត៌មានរបស់អ្នក</h2>
					<table className="w-full table-fixed text-sm text-[#001346] divide-y">
						<tbody>
							{profileData.map((item, index) => (
							<tr key={index} className="h-[56px] border-b border-[#00134608]">
								<td className="w-[40%] text-[15px] font-[600] leading-normal">{item.label}</td>
								<td className="text-[15px] font-[400] leading-normal text-right">{item.value}</td>
							</tr>
							))}
						</tbody>
					</table>

					{/* Account setting */}
					<h2 className="text-[20px] font-[600] text-[#001346] leading-normal mt-6 mb-2">ការកំណត់គណនី</h2>
					<table className="w-full text-sm text-[#001346] divide-y">
						<tbody>
							<tr className="h-[56px] border-b border-[#00134608]">
								<td className="text-[16px] font-[400] leading-normal">បើកកម្មវិធីដោយប្រើជីវមាត្រ</td>
								<td className="text-right">
									<label className="inline-flex items-center cursor-pointer">
										<input type="checkbox" value="" className="sr-only peer" />
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 relative"></div>
									</label>
								</td>
							</tr>
							{/* <tr className="h-[56px] border-b border-[#00134608]">
								<td className="text-[16px] font-[400] leading-normal">Language</td>
								<td className="text-[16px] font-[400] leading-normal text-right">
									<div className="flex items-center justify-end space-x-1" onClick={openLangPopup}>
										<span>English</span>
										<ChevronRight className="w-4 h-4 text-[#001346]" />
									</div>
								</td>
							</tr> */}
							<tr className="h-[56px] border-b border-[#00134608]">
								<td className="text-[16px] font-[400] leading-normal">ប្តូរទៅងងឹត</td>
								<td className="text-right">
									<label className="inline-flex items-center cursor-pointer">
										<input type="checkbox" value="" className="sr-only peer" />
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 relative"></div>
									</label>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/*Change Language */}
				{/* {showLangPopup && (
					<div
						className={`fixed inset-0 z-50 flex items-end bg-black/40 transition-opacity duration-500 ${
							animateIn ? "opacity-100" : "opacity-0"
						}`}
					>
						<div
							className={`w-full bg-white rounded-t-[16px] p-4 transition-all duration-500 ease-in-out transform ${
								animateIn ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
							}`}
						>
							<div className="flex justify-center">
								<img src="/images/change-lang.png" width={209} height={196} alt="Change Languages" />
							</div>

							<div className="flex flex-col items-center mt-2 mb-2 w-full">
								<h2 className="text-[23px] font-[600] text-[#001346] text-center w-full">
									ប្តូរភាសាទៅជាខ្មែរ?
								</h2>
								<p className="text-[16px] font-[400] text-[#001346] leading-normal text-center w-full mt-2">
									អ្នកអាចលុបចោលការប្តូរទៅជាភាសាខ្មែរឥឡូវនេះ ប្រសិនបើមិនចង់ អ្នកអាចលុបចោលបាន
								</p>

								<button
									className="w-full mt-[15px] h-[48px] text-[16px] font-[600] text-white bg-[#0f4aea] rounded-[32px] text-center"
								>
									ប្តូរភាសាទៅជាខ្មែរ
								</button>

								<button
									onClick={closeLangPopup}
									className="w-full mt-[15px] h-[48px] text-[16px] font-[600] text-[#001346] bg-[rgba(0,19,70,0.05)] rounded-[32px] text-center"
								>
									បោះបង់
								</button>
							</div>
						</div>
					</div>
				)} */}
		
				<button
					onClick={openLogoutPopup}
					className="w-full text-white text-[16px] font-[600px] bg-[#f24444] h-[40px] hover:bg-[#f24444] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-[32px] text-base px-4 py-[8px] text-center"
				>
					ចេញពីគណនី
				</button>

				{/*Change Language */}
				{showLogoutPopup && (
					<div
						className={`fixed inset-0 z-50 flex items-end pb-[64px] bg-black/40 transition-opacity duration-500 ${
							animateIn ? "opacity-100" : "opacity-0"
						}`}
					>
						<div
							className={`w-full bg-white rounded-t-[16px] p-4 transition-all duration-500 ease-in-out transform ${
								animateIn ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
							}`}
						>
							<div className="flex justify-center">
								<img src="/images/logout.png" width={209} height={196} alt="Change Languages" />
							</div>

							<div className="flex flex-col items-center  w-full">
								<h2 className="text-[23px] font-[600] text-[#001346] text-center w-full">
									ចេញពីគណនីនេះ?
								</h2>
								<p className="text-[16px] font-[400] text-[#001346] leading-normal text-center w-full mt-2">
									ពេលចេញពីគណនី អ្នកអាចចូលម្តងទៀតដោយប្រើលេខសម្គាល់ NBC និងពាក្យសម្ងាត់។
								</p>

								<button onClick={handleLogout}
									className="w-full mt-[15px] h-[40px] px-[16px] py-[8px] leading-normal text-[16px] font-[600] text-white bg-[#f24444] rounded-[32px] text-center"
								>
									ចេញពីគណនី
								</button>

								<button
									onClick={closeLogoutPopup}
									className="w-full mt-[8px] h-[40px] px-[16px] py-[8px] leading-normal text-[16px] font-[600] text-[#001346] bg-[rgba(0,19,70,0.05)] rounded-[32px] text-center"
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