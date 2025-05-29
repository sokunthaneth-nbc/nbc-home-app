const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="hidden md:block">
			<nav className="bg-white border-b border-gray-200">
				{/* Flowbite Navbar or Sidebar for desktop */}
				<div className="max-w-screen-xl mx-auto px-4 py-4">
					<h1 className="text-xl font-bold">Desktop Navigation</h1>
				</div>
			</nav>
			<main className="p-4">{children}</main>
		</div>
	);
};

export default DesktopLayout;