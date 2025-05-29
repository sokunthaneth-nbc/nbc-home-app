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
		<section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
			<div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
				<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
						Sign in to your account
					</h1>

					<form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
						<div>
							<label htmlFor="staffId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Staff ID
							</label>
							<input
								type="text"
								id="staffId"
								value={staffId}
								onChange={(e) => setStaffId(e.target.value)}
								required
								className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Password
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
									tabIndex={-1}
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>

						<button
							type="submit"
							className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							Sign in
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}