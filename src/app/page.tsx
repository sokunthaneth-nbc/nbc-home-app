"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
	const router = useRouter();

	useEffect(() => {
		const timeout = setTimeout(() => {
			router.push("/login"); // Redirect after 3 seconds
		}, 3000); // 3 seconds = 3000 milliseconds

		return () => clearTimeout(timeout); // Clean up
	}, [router]);

	return (
		<section className="min-h-screen flex flex-col justify-center items-center relative bg-[#1c3b63]">
			{/* Centered Image */}
			<img
				src="/images/nbc-logo.png" // Replace this path with your actual image path
				alt="App Logo"
				className="w-32 h-32 object-contain mb-[20px]"
			/>
			<h1 className="font-normal text-lg text-white">NBC Home</h1>

			{/* Bottom Text */}
			<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-center px-4 text-white text-sm">
				<span className="font-normal">Powered by:<br /></span>
				<span className="font-medium">National Bank of Cambodia</span>
			</div>
		</section>
	);
}