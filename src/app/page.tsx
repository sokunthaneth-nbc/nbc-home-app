"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";

export default function HomePage() {
	const [isMounted, setIsMounted] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null; // or return a loading state

	return (
		<div className="p-6">
			{isDesktop ? (
				<>
					<h1 className="text-green-600 text-2xl">Desktop View</h1>
					{/* <div>ENV: {process.env.NEXT_PUBLIC_TEST_ENV}</div> */}
				</>
			) : (
				<h1 className="text-blue-600 text-xl">Mobile View</h1>
			)}
		</div>
	);
}