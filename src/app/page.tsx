"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true); // Ensure rendering happens only on client
		const timeout = setTimeout(() => {
			router.push("/login");
		}, 3000);

		return () => clearTimeout(timeout);
	}, [router]);

	if (!mounted) return null; // Avoid rendering on server

	return (
		<section className="min-h-screen flex flex-col justify-center items-center relative bg-[#1c3b63]">
			<img
				src="/images/nbc-logo.png"
				alt="App Logo"
				className="w-32 h-32 object-contain mb-5"
			/>
			<h1 className="font-normal text-lg text-white mb-2">NBC Home</h1>
			<p className="text-white text-sm animate-pulse">កំពុងបើកកម្មវិធី...</p>
			<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-center px-4 text-white text-sm">
				<span className="font-normal">Powered by:<br /></span>
				<span className="font-medium">National Bank of Cambodia</span>
			</div>
		</section>
	);
}