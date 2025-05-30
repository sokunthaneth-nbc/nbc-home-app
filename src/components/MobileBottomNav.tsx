"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Settings } from "lucide-react";

export default function MobileBottomNav() {

	const pathname = usePathname();

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
			<ul className="flex justify-around items-center h-16">
				<NavItem href="/home" icon={<Home size={20} />} active={pathname === "/home"} label="Home" />
				<NavItem href="/attendance" icon={<User size={20} />} active={pathname === "/attendance"} label="Attendance" />
				<NavItem href="/profile" icon={<Settings size={20} />} active={pathname === "/profile"} label="Profile" />
			</ul>
		</nav>
	);
}

function NavItem({
	href,
	icon,
	label,
	active,
}: {
	href: string;
	icon: React.ReactNode;
	label: string;
	active: boolean;
}) {
	return (
		<li>
			<Link
				href={href}
				className={`flex flex-col items-center text-xs ${
					active
						? "text-blue-600 dark:text-blue-400"
						: "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
				}`}
			>
				{icon}
				<span>{label}</span>
			</Link>
		</li>
	);
}