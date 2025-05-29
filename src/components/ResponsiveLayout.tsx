"use client";
import DesktopLayout from "@/layouts/DesktopLayout";
import MobileLayout from "@/layouts/MobileLayout";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const ResponsiveLayout = ({ children }: { children: React.ReactNode }) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	return isDesktop ? (
		<DesktopLayout>{children}</DesktopLayout>
	) : (
		<MobileLayout>{children}</MobileLayout>
	);
};

export default ResponsiveLayout;