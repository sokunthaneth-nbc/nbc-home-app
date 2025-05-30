import Link from 'next/link';
import MobileBottomNav from "@/components/MobileBottomNav";
import { ArrowRight } from 'lucide-react';

export default function DashboardPage() {
	const today = new Date();
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}).format(today);

	const announcements = [
		{
			id: 1,
			dateKh: '៣០ កក្កដា ២០២៥',
			text: `អគ្គលេខាធិការដ្ឋាន សូមជម្រាបជូនដំណឹងដល់មន្ត្រីបុគ្គលិកធនាគារជាតិនៃកម្ពុជាទាំងអស់ ឱ្យបានជ្រាបថា ធនាគារជាតិនៃកម្ពុជានឹងផ្តល់អាហារូបករណ៍ដល់មន្ត្រី-បុគ្គលិកធនាគារជាតិនៃកម្ពុជា
		នូវកម្មវិធីសិក្សាកម្រិត Micro-Master តាមប្រព័ន្ធអនឡាញសម្រាប់មុខវិជ្ជា Data, Economics, and Design of Policy, Finance និង Statistics and Data Science
		នៃវិទ្យាស្ថានបច្ចេកវិទ្យា Massachusetts (MIT)។`,
		},
		{
			id: 2,
			dateKh: '១ កញ្ញា ២០២៥',
			text: `សេចក្ដីជូនដំណឹងស្តីពីការចាប់ផ្តើមកម្មវិធីសិក្សាថ្មី MIT Online ក្នុងខែ កញ្ញា សម្រាប់បុគ្គលិក IT និងនិស្សិតផ្នែកសេដ្ឋកិច្ច។`,
		},
		{
			id: 3,
			dateKh: '១៥ តុលា ២០២៥',
			text: `ចាប់ផ្តើមទទួលពាក្យស្នើសុំចូលរួមវគ្គបណ្តុះបណ្តាលថ្មីសម្រាប់មុខវិជ្ជា Statistics and Data Science សហការជាមួយ MIT។`,
		},
		{
			id: 4,
			dateKh: '៣០ កក្កដា ២០២៥',
			text: `អគ្គលេខាធិការដ្ឋាន សូមជម្រាបជូនដំណឹងដល់មន្ត្រីបុគ្គលិកធនាគារជាតិនៃកម្ពុជាទាំងអស់ ឱ្យបានជ្រាបថា ធនាគារជាតិនៃកម្ពុជានឹងផ្តល់អាហារូបករណ៍ដល់មន្ត្រី-បុគ្គលិកធនាគារជាតិនៃកម្ពុជា
		នូវកម្មវិធីសិក្សាកម្រិត Micro-Master តាមប្រព័ន្ធអនឡាញសម្រាប់មុខវិជ្ជា Data, Economics, and Design of Policy, Finance និង Statistics and Data Science
		នៃវិទ្យាស្ថានបច្ចេកវិទ្យា Massachusetts (MIT)។`,
		},
	];

	return (
		<>
			<main className="bg-gray-100 p-4 pb-24 space-y-4">
				{/* Header Card */}
				<div className="flex items-center space-x-4">
					<img
						src="/images/user.png"
						width={64}
						height={64}
						alt="Profile"
						className="rounded-full"
					/>
					<div>
						<h2 className="text-[16px] font-[400] text-[#001346] leading-normal">Welcome back</h2>
						<p className="text-[23px] font-[600] text-[#001346]">Tep Vanna</p>
						<p className="text-[13px] font-[400] text-[#001346] leading-normal">{formattedDate}</p>
					</div>
				</div>

				{/* Looping Cards */}
				{announcements.map((item) => (
					<div key={item.id} className="bg-[rgba(0,19,70,0.03)] p-[16px] rounded-[24px]">
						<h3 className="text-[16px] font-[600] text-[#001346] mb-2">{item.dateKh}</h3>
						<p className="text-[16px] font-[400] text-[#001346] leading-normal whitespace-pre-line">
							{item.text}
						</p>
						<Link href="#">
							<span className="flex items-center gap-x-1 text-[#001346] text-[16px] font-[600] leading-normal rounded-[32px] bg-[rgba(0,19,70,0.05)] mt-4 h-[40px] w-[101px] px-[16px] py-[8px] hover:underline">
								View <ArrowRight className="w-[24px] h-[24px] font-normal ml-[5px]" />
							</span>
						</Link>
					</div>
				))}
				</main>
			<MobileBottomNav />
		</>
	);
}