'use client';

import { useRouter } from 'next/navigation';
import MobileBottomNav from "@/components/MobileBottomNav";
import { ChevronRight } from 'lucide-react';

export default function ProfilePage() {
	const router = useRouter();

	const handleLogout = () => {
		console.log("User logged out");
		router.push('/login');
		// Your actual logout logic here
	};

	//Sample ProfileData
	const profileData = [
		{ label: 'Date of birth', value: '11/11/1911' },
		{ label: 'Phone number', value: '+855 (87) 575 857' },
		{ label: 'Email', value: 'mishel.matmorsell@nbc.gov.kh' },
		{ label: 'NBC Staff ID', value: '2659' },
		{ label: 'Department', value: 'IT' },
		{ label: 'Position', value: 'Deputy' },
		{ label: 'ក្របខណ្ឌ', value: '-' },
		{ label: 'ឋាន:', value: '-' },
	];

	return (
		<>
			<main className=" p-4 pb-24 space-y-4">
				<div className=" max-w-md mx-auto">
					<h2 className="text-[26px] font-[600] text-[#001346] text-center mb-4">Profile</h2>
					<p className="text-[#001346] mb-2">
						<span className='text-[16px] font-[400] leading-normal'>Hey there</span><br />
						<span className="italic text-[26px] font-[600]">Tep Vanna</span>
					</p>

					{/* Your information */}
					<h2 className="text-[20px] font-[600] text-[#001346] leading-normal mb-2">Your information</h2>
					<table className="w-full text-sm text-[#001346] divide-y">
						<tbody>
							{profileData.map((item, index) => (
							<tr key={index} className="h-[56px] border-b border-[#00134608]">
								<td className="text-[16px] font-[600] leading-normal">{item.label}</td>
								<td className="text-[16px] font-[400] leading-normal text-right">{item.value}</td>
							</tr>
							))}
						</tbody>
					</table>

					{/* Account setting */}
					<h2 className="text-[20px] font-[600] text-[#001346] leading-normal mt-6 mb-2">Account setting</h2>
					<table className="w-full text-sm text-[#001346] divide-y">
						<tbody>
							<tr className="h-[56px] border-b border-[#00134608]">
								<td className="text-[16px] font-[400] leading-normal">Open app with biometric</td>
								<td className="text-right">
									<label className="inline-flex items-center cursor-pointer">
										<input type="checkbox" value="" className="sr-only peer" />
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 relative"></div>
									</label>
								</td>
							</tr>
							<tr className="h-[56px] border-b border-[#00134608]">
								<td className="text-[16px] font-[400] leading-normal">Language</td>
								<td className="text-[16px] font-[400] leading-normal text-right">
									<div className="flex items-center justify-end space-x-1">
										<span>English</span>
										<ChevronRight className="w-4 h-4 text-[#001346]" />
									</div>
								</td>
							</tr>
							<tr className="h-[56px] border-b border-[#00134608]">
								<td className="text-[16px] font-[400] leading-normal">Switch theme to dark</td>
								<td className="">
									<div className="flex justify-end">
										<ChevronRight className="w-4 h-4 text-[#001346]" />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<button
					onClick={handleLogout}
					//className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
					className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-[32px] text-base px-4 py-4 text-center"
				>
					Logout
				</button>
			</main>
			<MobileBottomNav />
		</>
	);
}