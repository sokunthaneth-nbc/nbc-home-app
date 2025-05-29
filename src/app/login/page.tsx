"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // Make sure to install Lucide

export default function LoginPage() {
	const router = useRouter();
	//Static Login
	const defaultStaffId = "staff01";
	const defaultPassword = "123456";

	const [staffId, setStaffId] = useState(defaultStaffId);
	const [password, setPassword] = useState(defaultPassword);
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		if (staffId === defaultStaffId && password === defaultPassword) {
			router.push("/home");
		} else {
			alert("Invalid credentials");
		}
	};

	return (
		<section className="bg-gray-50 min-h-screen flex flex-col justify-between">
			<div className="w-full bg-white px-6 py-8 flex-1 overflow-auto">
				<p className="text-base font-normal text-[#040e28]">Welcome to</p>
				<h1 className="text-[26px] my-[15px] font-semibold leading-tight tracking-tight text-[#040e28]">
					National Bank of Cambodia <br />
					Application
				</h1>
				<p className="text-base font-normal text-[#040e28]">
					You can check your attendance, manage your information
				</p>

				<form className="space-y-6 pt-6 pb-32" onSubmit={handleLogin}>
					<div>
						<label htmlFor="staffId" className="block mb-2 text-sm font-normal text-[#040e28]">
							NBC ID Number <span className="text-red-600">*</span>
						</label>
						<input
							type="text"
							id="staffId"
							inputMode="numeric"
							pattern="\d*"
							value={staffId}
							onChange={(e) => setStaffId(e.target.value)}
							required
							className="bg-gray-50 border border-gray-300 h-[56px] p-[16px] rounded-lg block w-full focus:ring-primary-600 focus:border-primary-600"
						/>
					</div>

					<div>
						<label htmlFor="password" className="block mb-2 text-sm font-normal text-[#040e28]">
							Password <span className="text-red-600">*</span>
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="bg-gray-50 border border-gray-300 h-[56px] p-[16px] pr-10 rounded-lg block w-full focus:ring-primary-600 focus:border-primary-600"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute bottom-3 right-3 text-gray-500 hover:text-gray-700"
								tabIndex={-1}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
					</div>
				</form>
			</div>

			{/* Fixed bottom login button */}
			<div className="fixed bottom-0 left-0 w-full bg-white p-4 ">
				<button
					type="submit"
					onClick={handleLogin}
					className="w-full text-white bg-[#0f4aea] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-[32px] text-base px-[8px] py-[16px] text-center"
				>
					Next
				</button>
			</div>
		</section>
	);
}