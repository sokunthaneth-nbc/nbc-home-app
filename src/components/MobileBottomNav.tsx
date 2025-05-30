"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpenText, User } from "lucide-react";

export default function MobileBottomNav() {

	const pathname = usePathname();

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
			<ul className="flex justify-center items-center h-16 gap-x-2">
				<NavItem href="/home" icon={<Home size={20} />} active={pathname === "/home/"} label="ទំព័រដើម" />
				<NavItem href="/attendance" icon={<BookOpenText size={20} />} active={pathname === "/attendance/"} label="វត្តមានបុគ្គលិក" />
				<NavItem href="/profile" icon={<User size={20} />} active={pathname === "/profile/"} label="ការកំណត់" />
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
		<li className="w-1/3">
			<Link
				href={href}
				className={`flex flex-col items-center justify-center w-full h-[65px]  py-2 transition-colors ${
				active
					? "bg-[rgba(0,19,70,0.1)] border-t-[4px] border-[#001346] dark:bg-[rgba(0,19,70,0.2)] text-[#001346] dark:text-white"
					: "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
				}`}
			>
				{icon}
				<span className="text-xs mt-1">{label}</span>
			</Link>
		</li>
	);
}