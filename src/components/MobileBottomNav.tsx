"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpenText, User } from "lucide-react";

export default function MobileBottomNav() {

	const pathname = usePathname();

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t dark:bg-[#001346] border-gray-200">
			<ul className="flex justify-center items-center h-16 ">
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
				className={`flex flex-col bg-white items-center justify-center w-full h-[65px] dark:bg-[#001346] py-2 transition-colors ${
				active
					? "bg-menu border-t-[4px] border-[#001346] dark:bg-[#0d1f4f] text-[#001346] dark:border-white  dark:text-white"
					: "text-gray-500"
				}`}
			>
				{icon}
				<span className="text-xs mt-1">{label}</span>
			</Link>
		</li>
	);
}