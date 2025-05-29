import FirebaseMessaging from "@/components/FirebaseMessaging";
import MobileBottomNav from "@/components/MobileBottomNav";
export default function DashboardPage() {
  return (
    <>
      <div className="p-6 pb-20">
        {" "}
        {/* padding-bottom to prevent content hiding behind nav */}
        <h1 className="text-2xl text-green-600">Welcome to Home Page</h1>
        <div className="flex items-center min-h-screen">
          <FirebaseMessaging />
        </div>
      </div>
      <MobileBottomNav />
    </>
  );
}
