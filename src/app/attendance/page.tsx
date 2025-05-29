import MobileBottomNav from "@/components/MobileBottomNav";
export default function AttendancePage() {
	return (
		<>
			<div className="p-6 pb-20"> {/* padding-bottom to prevent content hiding behind nav */}
				<h1 className="text-2xl text-green-600">Welcome to Attendance Page</h1>
			</div>
			<MobileBottomNav />
		</>
	);
}