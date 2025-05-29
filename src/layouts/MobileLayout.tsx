const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
		<div className="block md:hidden">
			<nav className="bg-white border-b border-gray-200">
				{/* Flowbite mobile navbar or hamburger menu */}
				<div className="px-4 py-4">
					<h1 className="text-lg font-semibold">Mobile Navigation</h1>
				</div>
			</nav>
			<main className="p-4">{children}</main>
		</div>
  );
};

export default MobileLayout;